# == Schema Information
#
# Table name: items
#
#  id          :integer          not null, primary key
#  menu_id     :integer
#  name        :string
#  description :string
#  price       :decimal(, )
#  weight      :integer
#  status      :integer
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  image       :string
#  code        :string
#

FactoryGirl.define do
  factory :item do
    name { Faker::Food.dish }
    image { File.open(Rails.root.join('spec/fixtures/assets', [['1-garlic-bread','4-french-fries','4-santa-fe-beef-cheese','6-cheesy-tuna'].sample, 'png'].join('.'))) }
    description { Faker::Lorem.paragraph }
    status { rand(3) }
    sequence :weight { |n| n }
    price { Faker::Commerce.price }
    menu
  end
end
