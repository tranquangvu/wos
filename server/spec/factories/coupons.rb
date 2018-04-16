# == Schema Information
#
# Table name: coupons
#
#  id         :integer          not null, primary key
#  name       :string
#  code       :string
#  valid_from :date
#  valid_to   :date
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  price      :decimal(, )
#

FactoryGirl.define do
  factory :coupon do
    name "MyString"
    code { Faker::Commerce.promotion_code }
    price { Faker::Commerce.price }
    valid_from { Faker::Date.between(20.days.ago, Date.today) }
    valid_to { Faker::Date.forward(100) }

    before(:create) { |c| c.name = c.code } 
  end
end
