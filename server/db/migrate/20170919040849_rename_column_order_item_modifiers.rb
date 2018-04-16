class RenameColumnOrderItemModifiers < ActiveRecord::Migration[5.1]
  def change
    rename_column :order_item_modifiers, :quanity, :quantity
  end
end
