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

class Order < ApplicationRecord
  enum order_type: [ :delivery, :take_away ]
  enum status: [ :pending, :completed ]

  belongs_to :shop, required: false
  has_many :order_items, dependent: :destroy
  has_one :order_coupon, dependent: :destroy
  has_many :order_item_modifiers, dependent: :destroy

  validates :order_type, inclusion: { in: order_types.keys }

  accepts_nested_attributes_for :order_items, :order_coupon

  before_create :gen_order_code
  before_save :correct_phone_number

  def self.parse_phone_number(number)
    if number.start_with? "0"
      "+84"+number[1..-1]
    else
      number
    end
  end

  private
  def gen_order_code
    self.code = (0...5).map { rand(10) }.join
  end

  def correct_phone_number
    self.contact_phone_number = Order.parse_phone_number(self.contact_phone_number) if self.contact_phone_number.present?
  end
end
