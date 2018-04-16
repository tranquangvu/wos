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

FactoryGirl.define do
  factory :item_modifier_group do
    item nil
    modifier_group nil
  end
end
