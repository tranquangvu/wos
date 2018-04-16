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

class Modifier < ApplicationRecord
end
