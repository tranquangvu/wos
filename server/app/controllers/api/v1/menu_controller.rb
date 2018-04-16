class Api::V1::MenuController < Api::V1::ApiController
  api!
  param :include_items, :boolean
  def index
    @menus = params[:include_items].present? ? Menu.includes(:items).all : Menu.all

    render json: {
      status: :success,
      data: ActiveModelSerializers::SerializableResource.new(@menus)
    }, status: 200
  end
end
