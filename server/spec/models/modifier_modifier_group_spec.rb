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

require 'rails_helper'

RSpec.describe ModifierModifierGroup, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
