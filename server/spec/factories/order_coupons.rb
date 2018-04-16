# == Schema Information
#
# Table name: order_coupons
#
#  id         :integer          not null, primary key
#  coupon_id  :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  order_id   :integer
#

FactoryGirl.define do
  factory :order_coupon do
    coupon nil
  end
end
