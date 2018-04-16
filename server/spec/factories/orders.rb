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

FactoryGirl.define do
  factory :order do
    token { Faker::Code.ean }
    order_type { [0, 1].sample}
    contact_name { Faker::Name.name }
    contact_phone_number { Faker::PhoneNumber.phone_number }
    contact_address { [Faker::Address.street_address, Faker::Address.city].join(', ') }
    total_amount { Faker::Commerce.price }
    classifier { [0, 1, 2].sample }
    client_id { Faker::Crypto.sha1 }
    user_id { Faker::Code.imei }
    shop
  end
end
