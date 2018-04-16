# == Schema Information
#
# Table name: order_item_modifiers
#
#  id            :integer          not null, primary key
#  price         :decimal(, )
#  order_item_id :integer
#  modifier_id   :integer
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  order_id      :integer
#  quantity      :integer          default(1)
#

require 'rails_helper'

RSpec.describe OrderItemModifier, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
