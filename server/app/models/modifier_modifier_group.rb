# == Schema Information
#
# Table name: modifier_modifier_groups
#
#  id                :integer          not null, primary key
#  modifier_id       :integer
#  modifier_group_id :integer
#  lower_limit       :integer
#  upper_limit       :integer
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#

class ModifierModifierGroup < ApplicationRecord
  belongs_to :modifier
  belongs_to :modifier_group
end
