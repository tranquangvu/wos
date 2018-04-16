class CreateItems < ActiveRecord::Migration[5.1]
  def change
    create_table :items do |t|
      t.integer :menu_id
      t.string :name
      t.string :description
      t.decimal :price
      t.integer :weight
      t.integer :status

      t.timestamps
    end
  end
end
