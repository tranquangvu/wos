# == Schema Information
#
# Table name: menus
#
#  id          :integer          not null, primary key
#  parent_id   :integer
#  name        :string
#  description :string
#  status      :integer
#  weight      :integer
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  code        :string
#

class Menu < ApplicationRecord
  has_many :items, dependent: :destroy

  default_scope -> { order('weight DESC, id DESC') }
end
