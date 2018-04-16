# == Schema Information
#
# Table name: item_modifier_groups
#
#  id                :integer          not null, primary key
#  item_id           :integer
#  modifier_group_id :integer
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#

class ItemModifierGroup < ApplicationRecord
  belongs_to :item
  belongs_to :modifier_group
end
