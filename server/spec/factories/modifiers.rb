# == Schema Information
#
# Table name: modifiers
#
#  id          :integer          not null, primary key
#  name        :string
#  description :string
#  price       :decimal(, )      default(0.0)
#  status      :integer
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  code        :string
#

FactoryGirl.define do
  factory :modifier do
    name { [Faker::Food.spice, Faker::Food.measurement].sample }
    description { Faker::Lorem.paragraph }
    price { Faker::Commerce.price }
    status { rand(3) }
  end
end
