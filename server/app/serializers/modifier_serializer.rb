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

class ModifierSerializer < ActiveModel::Serializer
  attributes :id,
             :name,
             :description,
             :price,
             :status,
             :created_at,
             :updated_at,
             :image,
             :price_unit

  # NOTE: remove this method when have image in database
  def image
    'http://bk-apac-prd.s3.amazonaws.com/sites/burgerking.com.fj/files/BK_FrenchFries_detail.png'
  end

  # NOTE: remove this method when have price_unit in database
  def price_unit
    'usd'
  end
end
