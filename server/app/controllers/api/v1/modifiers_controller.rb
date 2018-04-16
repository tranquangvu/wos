class Api::V1::ModifiersController < Api::V1::ApiController
  api!
  param :ids, String, required: false
  def index
    @modifiers = Modifier.all
    if params[:ids].present?
      @modifiers =  @modifiers.where(id: params[:ids].split(','))
    end
    render json: {status: :success, data: @modifiers }
  end
end
