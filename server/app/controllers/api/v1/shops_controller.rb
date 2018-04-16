class Api::V1::ShopsController < ApplicationController
  api!
  example <<-EOS
    {
      "status": "success",
      "data": [
        {
            "id": 1,
            "name": "Mitchell, Von and Kassulke",
            "address": "94170 Jeromy Rue, Lake Marlen",
            "created_at": "2017-09-19T10:10:26.162Z",
            "updated_at": "2017-09-19T10:10:26.162Z"
        },
        {
            "id": 2,
            "name": "Fisher LLC",
            "address": "6574 Quitzon Glen, Kuhnshire",
            "created_at": "2017-09-19T10:10:26.165Z",
            "updated_at": "2017-09-19T10:10:26.165Z"
        },
        ...
      ]
    }
  EOS
  def index
    @shops = Shop.all

    render json: { status: :success, data: @shops }
  end
end
