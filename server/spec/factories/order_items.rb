# == Schema Information
#
# Table name: order_items
#
#  id         :integer          not null, primary key
#  name       :string
#  price      :decimal(, )
#  item_id    :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  order_id   :integer
#  quantity   :integer          default(1)
#

FactoryGirl.define do
  factory :order_item do
    name "MyString"
    price "9.99"
    order
    item
    before :create do |i|
      i.price = i.item.price
      i.name = i.item.name
    end
  end
end
