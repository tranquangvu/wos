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

class OrderItem < ApplicationRecord
  belongs_to :item
  belongs_to :order
  has_many :order_item_modififers, class_name: 'OrderItemModifier'

  accepts_nested_attributes_for :order_item_modififers

  before_validation :copy_from_item

  validates :price, :quantity, :name, presence: true


  def self.build_from_item(item)
    oi = OrderItem.new
    oi.name = item.name
    oi.price = item.price
    oi.item = item
    oi
  end

  private

  def copy_from_item
    if self.item.present?
      self.name = self.item.name
      self.price = self.item.price
      self.item_id = self.item.id
    end
  end
end
