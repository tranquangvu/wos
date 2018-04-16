# == Schema Information
#
# Table name: modifier_groups
#
#  id            :integer          not null, primary key
#  name          :string
#  status        :integer
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  single_choice :boolean
#  code          :string
#

class ModifierGroup < ApplicationRecord
  has_and_belongs_to_many :modifiers, join_table: 'modifier_modifier_groups'
  has_and_belongs_to_many :items, join_table: 'item_modifier_groups'
  has_many :modifier_modifier_groups
end
