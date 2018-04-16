class ChangeForeignKeys < ActiveRecord::Migration[5.1]
  def change
    remove_foreign_key :order_item_modifiers, column: :order_item_id
    add_foreign_key :order_item_modifiers, :order_items, column: :order_item_id
  end
end
