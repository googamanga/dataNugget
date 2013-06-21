class RemoveTrainedFunctionFromDataSets < ActiveRecord::Migration
  def up
    remove_column :data_sets, :trained_function
  end

  def down
    add_column :data_sets, :trained_function, :text
  end
end
