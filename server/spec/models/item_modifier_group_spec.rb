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

require 'rails_helper'

RSpec.describe ItemModifierGroup, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
