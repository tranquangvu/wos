class CreateModifierModifierGroups < ActiveRecord::Migration[5.1]
  def change
    create_table :modifier_modifier_groups do |t|
      t.references :modifier, foreign_key: true
      t.references :modifier_group, foreign_key: true
      t.integer :lower_limit
      t.integer :upper_limit

      t.timestamps
    end
  end
end
