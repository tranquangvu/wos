class Api::V1::OrdersController < Api::V1::ApiController

  api!
  example <<-EOS
    {
      "status": "success",
      "data": [
      {
          "id": 1,
          "token": "2148302517869",
          "code": "B00066USX2",
          "order_type": 1,
          "contact_name": "Granville Wuckert",
          "contact_phone_number": "1-857-027-6550",
          "contact_address": "726 Hilpert Trace, West Manuel",
          "created_at": "2017-09-19T09:25:38.446Z",
          "updated_at": "2017-09-19T09:25:38.446Z",
          "order_items": [
          {
              "id": 2,
              "name": "Philadelphia maki",
              "price": "7.44",
              "item_id": 25,
              "created_at": "2017-09-19T09:25:38.495Z",
              "updated_at": "2017-09-19T09:25:38.495Z",
              "order_id": 2,
              "quantity": 1
          },
          {
              "id": 1,
              "name": "Chicken milanese",
              "price": "28.99",
              "item_id": 22,
              "created_at": "2017-09-19T09:25:38.471Z",
              "updated_at": "2017-09-19T09:25:38.471Z",
              "order_id": 2,
              "quantity": 1
          }],
          "order_item_modifiers": [
            {
                "id": 5018,
                "price": "84.77",
                "order_item_id": 274,
                "modifier_id": 5,
                "created_at": "2017-09-19T09:55:18.441Z",
                "updated_at": "2017-09-19T09:55:18.441Z",
                "order_id": 66,
                "quantity": 1
            },
            {
                "id": 5017,
                "price": "50.62",
                "order_item_id": 274,
                "modifier_id": 1,
                "created_at": "2017-09-19T09:55:18.439Z",
                "updated_at": "2017-09-19T09:55:18.439Z",
                "order_id": 66,
                "quantity": 1
            }
          ]
      },
      ...
      }]
  }
  EOS
  def index
    @orders = Order.all

    render json: { status: :success, data: @orders }, include: [:order_items, :order_item_modifiers]
  end

  api!
  example <<-EOS
  {
    "order" =>
    {
        "contact_name" => "Andrea Pirlo",
        "contact_phone_number" => "0912345678",
        "contact_address" => "Ngo Duc Ke, Ben Thanh ward",
        "order_type" => "1",
        "shop_id" => "1"
        "order_items_attributes" =>
        {
            "0" =>
            {
                "item_id" => "1",
                "order_item_modififers_attributes" =>
                {
                    "0" =>
                    {
                        "modifier_id" => "1", "quantity" => "2"
                    }
                },
                "quantity" => "2"
            }
        },
        "order_coupon_attributes" => {
          "coupon_id": "1"
        }
    }
  }
  EOS
  def create
    order = Order.new order_params
    if order.save
      path = save_file order
      UploadOrderFtpJob.set(wait: 10.seconds).perform_later order.id
      render json: { status: :success, data: order.reload }, include: [:order_items, :order_item_modifiers, :order_coupon]
    else
      render json: { status: :error, error: order.errors.full_messages.join('\n') }
    end
  end

  api!
  param :phone_number, String, required: true
  param :order_type, String
  param :classifier, String
  param :client_id, String
  param :user_id, String
  def current
    phone_number = Order.parse_phone_number order_details_params[:phone_number]

    order = Order.where(contact_phone_number: phone_number, status: :pending).last
    unless order.present?
      order = Order.new contact_phone_number: phone_number, order_type: "delivery", status: :pending
    end

    order.order_type = params[:order_type] if params[:order_type].present?
    order.classifier = params[:classifier] if params[:classifier].present?
    order.client_id = params[:client_id] if params[:client_id].present?
    order.user_id = params[:user_id] if params[:user_id].present?
    order.save!

    render json: { status: :success, data: order }, include: [:order_items, :order_item_modifiers, :order_coupon]
  end

  api :POST, '/v1/orders/complete', "Complete the order"
  param :phone_number, String, required: true
  param :order, Hash, required: true do
    param :contact_name, String
    param :contact_phone_number, String, required: true
    param :contact_address, String
    param :order_type, ["delivery", "take_away"], required: true
    param :shop_id, :number, required: false
    param :order_items_attributes, Array, required: true do
      param :item_id, :number, required: true
      param :order_item_modififers_attributes, Array, required: true do
        param :modifier_id, :number, required: true
        param :quantity, :number, required: true
      end
      param :quantity, :number, required: true
    end
    param :order_coupon_attributes, Hash do
      param :coupon_id, :number
    end
  end
  def complete
    phone_number = Order.parse_phone_number order_details_params[:phone_number]
    order = Order.where(contact_phone_number: phone_number, status: :pending).last
    if order.present?
      Order.transaction do
        order.attributes = order_params.except :order_items_attributes, :order_coupon_attributes
        order.order_items.destroy_all
        order_params[:order_items_attributes].each do |item_attrs|
          order.order_items << OrderItem.new(item_attrs)
        end
        if order_params[:order_coupon_attributes].present?
          order.order_coupon = OrderCoupon.new(order_params[:order_coupon_attributes])
        end
        order.status = "completed"
        if order.save!
          path = save_file order
          UploadOrderFtpJob.set(wait: 2.seconds).perform_later order.id
          if order.client_id.present? && order.user_id.present?
            NotifyChatbotJob.set(wait: 2.seconds).perform_later order.id
          end
          render json: { status: :success, data: order }, include: [:order_items, :order_item_modifiers, :order_coupon]
        end
      end
    else
      render json: { status: :error, error: "No order found for this number #{phone_number}"}
    end
  end

  private

  def save_file(order)
    converter = OrderXmlConverter.new
    xml = converter.to_xml order

    dir = Rails.root.join('tmp', 'order_xmls')
    Dir.mkdir(dir) unless Dir.exist?(dir)

    path = dir.join("#{order.code}.xml")
    File.open(path, 'wb') do |file|
      file.write xml
    end
    path
  end

  def order_params
    params.require(:order).permit(:order_type, :contact_name, :contact_phone_number, :contact_address, :shop_id, :total_amount,
                                    order_items_attributes: [:item_id, :quantity, order_item_modififers_attributes: [:modifier_id, :quantity]],
                                    order_coupon_attributes: [:coupon_id])
  end

  def order_details_params
    params.permit(:phone_number)
  end
end
