# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170924142712) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "coupons", force: :cascade do |t|
    t.string "name"
    t.string "code"
    t.date "valid_from"
    t.date "valid_to"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.decimal "price"
  end

  create_table "item_modifier_groups", force: :cascade do |t|
    t.bigint "item_id"
    t.bigint "modifier_group_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["item_id"], name: "index_item_modifier_groups_on_item_id"
    t.index ["modifier_group_id"], name: "index_item_modifier_groups_on_modifier_group_id"
  end

  create_table "items", force: :cascade do |t|
    t.integer "menu_id"
    t.string "name"
    t.string "description"
    t.decimal "price"
    t.integer "weight"
    t.integer "status"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "image"
    t.string "code"
  end

  create_table "menus", force: :cascade do |t|
    t.integer "parent_id"
    t.string "name"
    t.string "description"
    t.integer "status"
    t.integer "weight"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "code"
  end

  create_table "modifier_groups", force: :cascade do |t|
    t.string "name"
    t.integer "status"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "single_choice"
    t.string "code"
  end

  create_table "modifier_modifier_groups", force: :cascade do |t|
    t.bigint "modifier_id"
    t.bigint "modifier_group_id"
    t.integer "lower_limit"
    t.integer "upper_limit"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["modifier_group_id"], name: "index_modifier_modifier_groups_on_modifier_group_id"
    t.index ["modifier_id"], name: "index_modifier_modifier_groups_on_modifier_id"
  end

  create_table "modifiers", force: :cascade do |t|
    t.string "name"
    t.string "description"
    t.decimal "price", default: "0.0"
    t.integer "status"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "code"
  end

  create_table "order_coupons", force: :cascade do |t|
    t.bigint "coupon_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "order_id"
    t.index ["coupon_id"], name: "index_order_coupons_on_coupon_id"
    t.index ["order_id"], name: "index_order_coupons_on_order_id"
  end

  create_table "order_item_modifiers", force: :cascade do |t|
    t.decimal "price"
    t.bigint "order_item_id"
    t.bigint "modifier_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "order_id"
    t.integer "quantity", default: 1
    t.index ["modifier_id"], name: "index_order_item_modifiers_on_modifier_id"
    t.index ["order_id"], name: "index_order_item_modifiers_on_order_id"
    t.index ["order_item_id"], name: "index_order_item_modifiers_on_order_item_id"
  end

  create_table "order_items", force: :cascade do |t|
    t.string "name"
    t.decimal "price"
    t.integer "item_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "order_id"
    t.integer "quantity", default: 1
    t.index ["order_id"], name: "index_order_items_on_order_id"
  end

  create_table "orders", force: :cascade do |t|
    t.string "token"
    t.string "code"
    t.integer "order_type"
    t.string "contact_name"
    t.string "contact_phone_number"
    t.string "contact_address"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "shop_id"
    t.decimal "total_amount"
    t.integer "status", default: 0
    t.integer "classifier"
    t.string "client_id"
    t.string "user_id"
    t.index ["shop_id"], name: "index_orders_on_shop_id"
  end

  create_table "shops", force: :cascade do |t|
    t.string "name"
    t.string "address"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "item_modifier_groups", "items"
  add_foreign_key "item_modifier_groups", "modifier_groups"
  add_foreign_key "modifier_modifier_groups", "modifier_groups"
  add_foreign_key "modifier_modifier_groups", "modifiers"
  add_foreign_key "order_coupons", "coupons"
  add_foreign_key "order_coupons", "orders"
  add_foreign_key "order_item_modifiers", "modifiers"
  add_foreign_key "order_item_modifiers", "order_items"
  add_foreign_key "order_item_modifiers", "orders"
  add_foreign_key "order_items", "orders"
  add_foreign_key "orders", "shops"
end
