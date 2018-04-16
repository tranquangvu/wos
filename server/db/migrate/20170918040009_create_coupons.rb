class CreateCoupons < ActiveRecord::Migration[5.1]
  def change
    create_table :coupons do |t|
      t.string :name
      t.string :code
      t.date :valid_from
      t.date :valid_to

      t.timestamps
    end
  end
end
