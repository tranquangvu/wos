class AddColumnsToOrders < ActiveRecord::Migration[5.1]
  def change
    add_column :orders, :classifier, :integer
    add_column :orders, :client_id, :string
    add_column :orders, :user_id, :string
  end
end
