class AddQuantityToOrderItems < ActiveRecord::Migration[5.1]
  def change
    add_column :order_items, :quanity, :integer, default: 1
    add_column :order_item_modifiers, :quanity, :integer, default: 1
  end
end
