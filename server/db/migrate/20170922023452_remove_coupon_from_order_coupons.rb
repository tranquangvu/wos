class RemoveCouponFromOrderCoupons < ActiveRecord::Migration[5.1]
  def change
    remove_column :order_coupons, :code
  end
end
