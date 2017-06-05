require 'google_api'
#set this variable in your .env.development .env.production files
GoogleApi.instance.setup(key: ENV['GOOGLE_GEOCODE_API'])
