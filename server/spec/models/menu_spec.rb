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

require 'rails_helper'

RSpec.describe Menu, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
