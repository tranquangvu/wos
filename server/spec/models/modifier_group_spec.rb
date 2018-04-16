# == Schema Information
#
# Table name: modifier_groups
#
#  id            :integer          not null, primary key
#  name          :string
#  status        :integer
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  single_choice :boolean
#  code          :string
#

require 'rails_helper'

RSpec.describe ModifierGroup, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
