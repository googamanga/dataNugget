class DataSet < ActiveRecord::Base
  attr_accessible :meta_data, :trained_function, :name
end
