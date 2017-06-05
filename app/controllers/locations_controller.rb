class LocationsController < ApplicationController
  protect_from_forgery with: :null_session

  def home
  end

  def index
    render json: Location.all
  end

  def search
    results = GoogleApi.instance.geocode(address: params[:address])["results"]
    data = {}
    located_results = results.map do |result|
      political_localizaton = result["address_components"].map do |comp|
        comp.dig("types").size > 1 ? { comp["types"].first => comp["long_name"]  } : nil
      end
      data = political_localizaton.compact << (result.dig("geometry", "location"))
      data = data.reduce({address: params[:address]}, :update)
    end
    render json: located_results
  end

  def create
    loc = Location.new(location_params)
    return head :created if loc.save
  end

  private

  def location_params
    params.permit(:address, :lat, :lng)
  end
end
