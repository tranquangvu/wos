# == Schema Information
#
# Table name: shops
#
#  id         :integer          not null, primary key
#  name       :string
#  address    :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

FactoryGirl.define do
  factory :shop do
    name { Faker::Company.name }
    address { [Faker::Address.street_address, Faker::Address.city].join(', ') }
  end
end
