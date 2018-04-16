class Api::V1::ItemsController < Api::V1::ApiController
  api!
  param :ids, String, required: false
  example <<-EOS
    {
      "status": "success",
      "data": [
        {
            "id": 55,
            "menu_id": 10,
            "name": "Fettuccine Alfredo",
            "description": "Alias nemo ducimus dolore non recusandae animi. Asperiores ut non. Omnis architecto voluptatem deserunt illo ea natus animi. Quia officiis id ab non quam omnis perspiciatis. Sit at dignissimos autem provident.",
            "price": "57.03",
            "weight": 55,
            "status": 2,
            "created_at": "2017-09-20T09:50:12.668Z",
            "updated_at": "2017-09-20T09:50:12.668Z",
            "image":
            {
                "url": "/uploads/6-cheesy-tuna.png"
            }
        },
        ...
      ]
    }
  EOS
  def index
    @items = Item.all.order('weight DESC')
    if params[:ids].present?
      @items =  @items.where(id: params[:ids].split(','))
    end
    render json: {status: :success, data: @items }
  end

  api!
  param :include_modifier_groups, :boolean
  def show
    include_modifier_groups = params[:include_modifier_groups].present?
    collection = include_modifier_groups ? Item.includes(modifier_groups: [:modifiers, :modifier_modifier_groups]) : Item

    @item = collection.find(params[:id])

    render json: {
      status: :success,
      data: ActiveModelSerializers::SerializableResource.new(
        @item,
        include_modifier_groups: include_modifier_groups
      )
    }, status: 200
  end
end
