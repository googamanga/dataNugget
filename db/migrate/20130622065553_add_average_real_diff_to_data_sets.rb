class AddAverageRealDiffToDataSets < ActiveRecord::Migration
  def change
    add_column :data_sets, :average_real_diff, :float
  end
end
