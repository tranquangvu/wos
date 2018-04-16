class UpdateOrderItems < ActiveRecord::Migration[5.1]
  def change
    rename_column :order_items, :parent_id, :item_id
  end
end
