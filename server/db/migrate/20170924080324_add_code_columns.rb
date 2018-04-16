class AddCodeColumns < ActiveRecord::Migration[5.1]
  def change
    add_column :modifiers, :code, :string
    add_column :modifier_groups, :code, :string
    add_column :menus, :code, :string
    add_column :items, :code, :string
  end
end
