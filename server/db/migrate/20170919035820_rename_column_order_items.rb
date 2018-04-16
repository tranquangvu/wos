class RenameColumnOrderItems < ActiveRecord::Migration[5.1]
  def change
    rename_column :order_items, :quanity, :quantity
  end
end
