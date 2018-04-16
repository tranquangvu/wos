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

FactoryGirl.define do
  factory :modifier_group do
    name { Faker::Food.ingredient }
    status { rand(3) }
  end
end
