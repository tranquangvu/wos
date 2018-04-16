class CreateOrderItems < ActiveRecord::Migration[5.1]
  def change
    create_table :order_items do |t|
      t.string :name
      t.decimal :price
      t.integer :parent_id

      t.timestamps
    end
  end
end
