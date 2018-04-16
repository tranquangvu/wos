class Api::V1::Items::ModifierGroupsController < Api::V1::ApiController
  before_action :find_item

  api!
  example <<-EOS
  {
    "status": "success",
    "data": {
      "modifier_groups": [{
        "id": 10,
        "name": "Rye",
        "status": 0,
        "created_at": "2017-09-18T04:53:45.109Z",
        "updated_at": "2017-09-18T04:53:45.109Z",
        "modifiers": [{
          "id": 93,
          "name": "1/4 pint",
          "description": "Aliquid laudantium dolorem quae in. Iusto veritatis quia debitis. Eos nemo quia deserunt dolorem qui. Rerum eum laborum nemo aspernatur cupiditate.",
          "price": "47.68",
          "status": 2,
          "created_at": "2017-09-18T04:53:45.055Z",
          "updated_at": "2017-09-18T04:53:45.055Z"
        }],
        "modifier_modifier_groups": [{
          "id": 11,
          "modifier_id": 93,
          "modifier_group_id": 10,
          "lower_limit": 1,
          "upper_limit": 4,
          "created_at": "2017-09-18T04:53:45.155Z",
          "updated_at": "2017-09-18T04:53:45.155Z"
        }]
      }]
    }
  }
  EOS
  def index
    @modifier_groups = @item.modifier_groups.includes(:modifiers, :modifier_modifier_groups)

    render json: {
      status: :success,
      data: ActiveModelSerializers::SerializableResource.new(@modifier_groups)
    }, status: 200
  end

  private

  def find_item
    @item = Item.find params[:item_id]
  end
end
