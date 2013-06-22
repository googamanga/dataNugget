class DataSet < ActiveRecord::Base
  attr_accessible :meta_data, :name, :target, :net
  serialize :meta_data
  serialize :net
end
