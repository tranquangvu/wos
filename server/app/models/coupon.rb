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

class Coupon < ApplicationRecord
  has_many :order_coupons
end
