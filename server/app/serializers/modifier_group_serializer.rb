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

class ModifierGroupSerializer < ActiveModel::Serializer
  attributes :id,
             :name,
             :status,
             :created_at,
             :updated_at

  has_many :modifiers, serializer: ModifierSerializer
  has_many :modifier_modifier_groups, serializer:ModifierModifierGroupSerializer
end
