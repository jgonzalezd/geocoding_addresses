Rails.application.routes.draw do
  root to: "locations#home"

  get "/search", to: 'locations#search'
  get "/index",  to: 'locations#index'
  post "/create", to: 'locations#create'
end
