class ChangeColumnInOrderItemModifiers < ActiveRecord::Migration[5.1]
  def change
    rename_column :order_item_modifiers, :item_id, :order_item_id
  end
end
