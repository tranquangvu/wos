# == Schema Information
#
# Table name: items
#
#  id          :integer          not null, primary key
#  menu_id     :integer
#  name        :string
#  description :string
#  price       :decimal(, )
#  weight      :integer
#  status      :integer
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  image       :string
#  code        :string
#

require 'rails_helper'

RSpec.describe Item, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
