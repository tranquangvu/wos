# == Schema Information
#
# Table name: shops
#
#  id         :integer          not null, primary key
#  name       :string
#  address    :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Shop < ApplicationRecord
  has_many :orders
end
