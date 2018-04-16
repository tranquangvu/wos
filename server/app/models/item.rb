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

class Item < ApplicationRecord
  mount_uploader :image, ImageUploader

  validates :name, :price, :code, presence: true

  belongs_to :menu
  has_many :order_items
  has_and_belongs_to_many :modifier_groups, join_table: 'item_modifier_groups'

  default_scope -> { order('weight DESC, id DESC') }

end
