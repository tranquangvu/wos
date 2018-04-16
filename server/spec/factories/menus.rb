# == Schema Information
#
# Table name: menus
#
#  id          :integer          not null, primary key
#  parent_id   :integer
#  name        :string
#  description :string
#  status      :integer
#  weight      :integer
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  code        :string
#

FactoryGirl.define do
  factory :menu do
    name { Faker::Lorem.words(3).map(&:capitalize).join(' ') }
    description { Faker::Lorem.paragraph }
    status { rand(3) }
    sequence :weight { |n| n }
  end
end
