class AddOrderIdToOrderCoupons < ActiveRecord::Migration[5.1]
  def change
    add_reference :order_coupons, :order, foreign_key: true
  end
end
