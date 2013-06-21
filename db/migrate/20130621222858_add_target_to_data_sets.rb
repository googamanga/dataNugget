class AddTargetToDataSets < ActiveRecord::Migration
  def change
    add_column :data_sets, :target, :integer
  end
end
