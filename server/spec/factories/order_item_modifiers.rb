# == Schema Information
#
# Table name: order_item_modifiers
#
#  id            :integer          not null, primary key
#  price         :decimal(, )
#  order_item_id :integer
#  modifier_id   :integer
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  order_id      :integer
#  quantity      :integer          default(1)
#

FactoryGirl.define do
  factory :order_item_modifier do
    price "9.99"
    item nil
    modifier nil
  end
end
