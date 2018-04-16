class AddDefaultToModifiers < ActiveRecord::Migration[5.1]
  def change
    change_column :modifiers, :price, :decimal, default: 0
  end
end
