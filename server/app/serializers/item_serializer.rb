# == Schema Information
#
# Table name: items
#
#  id          :integer          not null, primary key
#  menu_id     :integer
#  name        :string
#  description :string
#  price       :decimal(, )
#  weight      :integer
#  status      :integer
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  image       :string
#  code        :string
#

class ItemSerializer < ActiveModel::Serializer
  attributes :id,
             :menu_id,
             :name,
             :description,
             :price,
             :weight,
             :status,
             :created_at,
             :updated_at,
             :image,
             :price_unit

  has_many :modifier_groups, serializer: ModifierGroupSerializer,
                             if: -> { instance_options[:include_modifier_groups] == true }

  # NOTE: remove this method when have price_unit in database
  def price_unit
    'usd'
  end
end
