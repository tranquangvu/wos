class CreateOrderCoupons < ActiveRecord::Migration[5.1]
  def change
    create_table :order_coupons do |t|
      t.string :code
      t.references :coupon, foreign_key: true

      t.timestamps
    end
  end
end
