require 'singleton'
require 'httparty'

class GoogleApi
  include Singleton
  include HTTParty

  base_uri 'maps.googleapis.com/maps/api'

  def setup(options={})
    @options = options
  end

  def geocode(query)
    p query
    self.class.get('/geocode/json', query: query)
  end

end
