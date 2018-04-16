class AddSingleChoiceToModifierGroups < ActiveRecord::Migration[5.1]
  def change
    add_column :modifier_groups, :single_choice, :boolean
  end
end
