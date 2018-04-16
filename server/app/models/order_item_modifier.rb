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

class OrderItemModifier < ApplicationRecord
  belongs_to :order_item, class_name: 'OrderItem'
  belongs_to :modifier
  belongs_to :order

  before_validation :assign_order_id
  before_validation :copy_from_modifier

  validates :price, :quantity, presence: true

  def self.build_from_modifier(modifier)
    oim = OrderItemModifier.new
    oim.price = modifier.price
    oim.modifier = modifier
    oim
  end

  private

  def assign_order_id
    if self.order_item.present?
      self.order = self.order_item.order
    end
  end

  def copy_from_modifier
    if self.modifier.present?
      self.price = self.modifier.price
    end
  end
end
