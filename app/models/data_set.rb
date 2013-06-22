class DataSet < ActiveRecord::Base
  attr_accessible :meta_data, :name, :target, :net, :average_real_diff
  serialize :meta_data
  serialize :net
end
