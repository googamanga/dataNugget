class AddNetToDataSets < ActiveRecord::Migration
  def change
    add_column :data_sets, :net, :text
  end
end
