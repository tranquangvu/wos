# == Schema Information
#
# Table name: orders
#
#  id                   :integer          not null, primary key
#  token                :string
#  code                 :string
#  order_type           :integer
#  contact_name         :string
#  contact_phone_number :string
#  contact_address      :string
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#  shop_id              :integer
#  total_amount         :decimal(, )
#  status               :integer          default("pending")
#  classifier           :integer
#  client_id            :string
#  user_id              :string
#

require 'rails_helper'

RSpec.describe Order, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
