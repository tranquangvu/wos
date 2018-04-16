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

class OrderCoupon < ApplicationRecord
  belongs_to :coupon
  belongs_to :order

  delegate :code, to: :coupon
end
