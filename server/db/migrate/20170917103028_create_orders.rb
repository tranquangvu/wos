class CreateOrders < ActiveRecord::Migration[5.1]
  def change
    create_table :orders do |t|
      t.string :token
      t.string :code
      t.integer :order_type
      t.string :contact_name
      t.string :contact_phone_number
      t.string :contact_address

      t.timestamps
    end
  end
end
