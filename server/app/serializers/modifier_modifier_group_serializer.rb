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

class ModifierModifierGroupSerializer < ActiveModel::Serializer
  attributes :id,
             :modifier_id,
             :modifier_group_id,
             :lower_limit,
             :upper_limit,
             :created_at,
             :updated_at
end
