class CreateModifiers < ActiveRecord::Migration[5.1]
  def change
    create_table :modifiers do |t|
      t.string :name
      t.string :description
      t.decimal :price
      t.integer :status

      t.timestamps
    end
  end
end
