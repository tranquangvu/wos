class CreateOrderItemModifiers < ActiveRecord::Migration[5.1]
  def change
    create_table :order_item_modifiers do |t|
      t.decimal :price
      t.references :item, foreign_key: true
      t.references :modifier, foreign_key: true

      t.timestamps
    end
  end
end
