class AddOrderIdToOrderItemModifiers < ActiveRecord::Migration[5.1]
  def change
    add_reference :order_item_modifiers, :order, foreign_key: true
  end
end
