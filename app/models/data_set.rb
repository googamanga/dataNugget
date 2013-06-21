class DataSet < ActiveRecord::Base
  attr_accessible :meta_data, :trained_function, :name, :target
  serialize :meta_data
end
