class CreateDataSets < ActiveRecord::Migration
  def change
    create_table :data_sets do |t|
      t.text :meta_data
      t.text :trained_function
      t.string :name

      t.timestamps
    end
  end
end
