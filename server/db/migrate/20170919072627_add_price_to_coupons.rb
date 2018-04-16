class AddPriceToCoupons < ActiveRecord::Migration[5.1]
  def change
    add_column :coupons, :price, :decimal
  end
end
