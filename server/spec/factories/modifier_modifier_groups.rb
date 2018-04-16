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

FactoryGirl.define do
  factory :modifier_modifier_group do
    lower_limit { rand(3) }
    upper_limit { rand(10) }

    modifier
    modifier_group
  end
end
