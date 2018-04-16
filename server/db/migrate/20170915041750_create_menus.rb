class CreateMenus < ActiveRecord::Migration[5.1]
  def change
    create_table :menus do |t|
      t.integer :parent_id
      t.string :name
      t.string :description
      t.integer :status
      t.integer :weight

      t.timestamps
    end
  end
end
