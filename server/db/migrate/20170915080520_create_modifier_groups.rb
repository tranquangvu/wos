class CreateModifierGroups < ActiveRecord::Migration[5.1]
  def change
    create_table :modifier_groups do |t|
      t.string :name
      t.integer :status

      t.timestamps
    end
  end
end
