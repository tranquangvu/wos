# == Schema Information
#
# Table name: menus
#
#  id          :integer          not null, primary key
#  parent_id   :integer
#  name        :string
#  description :string
#  status      :integer
#  weight      :integer
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  code        :string
#

class MenuSerializer < ActiveModel::Serializer
  attributes :id,
             :parent_id,
             :name,
             :description,
             :status,
             :weight,
             :created_at,
             :updated_at
  has_many :items, serializer: ItemSerializer
end
