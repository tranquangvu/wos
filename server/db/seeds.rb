# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


require 'active_record/fixtures'

CarrierWave.root = Rails.root.join('public/uploads')

puts "Loading fixture for environment #{Rails.env}."

fixtures_dir = Rails.root.join('db', 'fixtures').to_s
# The use of String#[] here is to support namespaced fixtures
fixture_files = Dir["#{fixtures_dir}/**/*.yml"].map {|f| f[(fixtures_dir.size + 1)..-5]}

if fixture_files.empty?
  puts "No fixtures found in #{fixtures_dir}. Aborted."
  return
end

puts "☑ Fixtures dir: #{fixtures_dir}"
puts "☑ Fixture files: #{fixture_files.inspect}"

ActiveRecord::Base.transaction do
  ActiveRecord::FixtureSet.create_fixtures(fixtures_dir, fixture_files)
end

# clean up CarriweWave
CarrierWave.clean_cached_files!(0)

puts "Creating coupons.."
coupons = FactoryGirl.create_list :coupon, 10

# puts "Creating shops..."
# shops = FactoryGirl.create_list :shop, 10

puts "OK, all done 🎉"


return

# puts "Creating menus..."
# menus = FactoryGirl.create_list :menu, 10

# puts "Creating dishes..."
# menus.each do |menu|
#   FactoryGirl.create_list :item, rand(10), menu: menu
# end

# puts "Creating coupons.."
# coupons = FactoryGirl.create_list :coupon, 10

# puts "Creating shops..."
# shops = FactoryGirl.create_list :shop, 10

# items = Item.all

# puts "Creating modifier groups and modifiers..."
# modifier_groups = FactoryGirl.create_list :modifier_group, 10

# modifier_groups.each do |modifier_group|
#   rand(5).times do |t|
#     modifier_group.modifiers << FactoryGirl.create(:modifier)
#     modifier_group.save
#   end
# end

# puts "Creating items-modifier_groups..."
# items.each do |item|
#   rand(4).times do |t|
#     FactoryGirl.create :item_modifier_group, item: item, modifier_group: modifier_groups[t]
#   end
# end
# item_modifier_groups = ItemModifierGroup.all.to_a

# puts "Creating orders..."
# rand(100).times do
#   order = FactoryGirl.create :order, shop: shops.sample

#   rand(10).times do
#     item = items.sample
#     order_item = OrderItem.build_from_item item
#     order_item.order = order
#     order_item.save!
#     rand(50).times do
#       mg = item.modifier_groups.sample
#       if mg
#         modifier = mg.modifiers.sample
#         if modifier
#           order_item_modifier = OrderItemModifier.build_from_modifier(modifier)
#           order_item_modifier.order_item = order_item
#           order_item_modifier.order = order
#           order_item_modifier.save!
#         end
#       end
#     end
#   end
# end

# puts "Seeding ended."
