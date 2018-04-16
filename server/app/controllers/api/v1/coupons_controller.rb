class Api::V1::CouponsController < Api::V1::ApiController
  api!
  example <<-EOS
    {
      "status": "success",
      "data": [
      {
          "id": 1,
          "name": "SweetPrice981298",
          "code": "SweetPrice981298",
          "price":"25.66",
          "valid_from": "2017-09-13",
          "valid_to": "2017-10-30",
          "created_at": "2017-09-18T04:16:52.716Z",
          "updated_at": "2017-09-18T04:16:52.716Z"
      },
      ...
      {
          "id": 10,
          "name": "GreatCode309631",
          "code": "GreatCode309631",
          "price":"25.66",
          "valid_from": "2017-09-08",
          "valid_to": "2017-09-24",
          "created_at": "2017-09-18T04:16:52.738Z",
          "updated_at": "2017-09-18T04:16:52.738Z"
      }]
  }
  EOS
  def index
    @coupons = Coupon.all

    render json: { status: :success, data: @coupons }
  end

  api!
  example <<-EOS
    {
      "status": "success",
      "data":
      {
          "id": 1,
          "name": "PremiumCode183657",
          "code": "PremiumCode183657",
          "valid_from": "2017-09-05",
          "valid_to": "2017-12-28",
          "created_at": "2017-09-19T07:27:32.973Z",
          "updated_at": "2017-09-19T07:27:32.973Z",
          "price": "56.07"
      }
  }
  EOS
  def show
    @coupon = Coupon.find params[:id]
    render json: { status: :success, data: @coupon }
  end

  api :GET, "/coupons/find", "Find a coupon"
  param :code, String, required: true
  def find
    @coupon = Coupon.find_by_code params[:code]
    render json: { status: :success, data: @coupon }
  end
end
