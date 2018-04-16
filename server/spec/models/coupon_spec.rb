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

require 'rails_helper'

RSpec.describe Coupon, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
