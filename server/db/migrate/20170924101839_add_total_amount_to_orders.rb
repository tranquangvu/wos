class AddTotalAmountToOrders < ActiveRecord::Migration[5.1]
  def change
    add_column :orders, :total_amount, :decimal
  end
end
