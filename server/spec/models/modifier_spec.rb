# == Schema Information
#
# Table name: modifiers
#
#  id          :integer          not null, primary key
#  name        :string
#  description :string
#  price       :decimal(, )      default(0.0)
#  status      :integer
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  code        :string
#

require 'rails_helper'

RSpec.describe Modifier, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
