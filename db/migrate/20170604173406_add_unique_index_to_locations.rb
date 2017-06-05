class AddUniqueIndexToLocations < ActiveRecord::Migration[5.0]
  def change
    add_index :locations, [:lat, :lng], unique: true
  end
end
