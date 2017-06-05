source 'https://rubygems.org'

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '~> 5.0.0', '>= 5.0.0.1'
gem 'puma', '~> 3.0'
gem 'dotenv'
gem 'sqlite3'
gem 'httparty'

gem 'faker', '>= 1.6.1', group: [:development, :test, :staging]
group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', platform: :mri
  gem 'spring-commands-rspec'
end

group :development do
  gem 'annotate'
  gem "breakfast"
  # Access an IRB console on exception pages or by using <%= console %> anywhere in the code.
  gem 'web-console'
  gem 'listen', '~> 3.0.5'
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
end

group :test do
  gem 'guard-rspec' #The Guard file watcher for running rspec
  gem 'factory_girl_rails', group: [:development, :test, :staging]
  gem 'database_cleaner'
  gem 'rspec-rails' #The RSpec testing framework with Rails integrations
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
# gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
