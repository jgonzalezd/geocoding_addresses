require 'rails_helper'

describe LocationsController, type: :controller do


  describe 'GET index' do
    let!(:locats) { create_list(:location, 2) }

    it "retrieves saved addresses" do
      get :index
      expect(json_body.size).to eq(2)
    end
  end

  describe 'GET search' do
    it "returns a list of objects containing only relevant location info" do
      example_response_from_google = JSON.parse(File.read("#{Rails.root}/spec/support/google_api_responses/geocode.json"))
      allow(GoogleApi.instance).to receive(:geocode).and_return(example_response_from_google)
      get :search, { address: "1600+Amphitheatre+Parkway,+Mountain+View,+CA" }
      expect(json_body.size).to eq(1)
      expected_keys = ["address", "locality", "administrative_area_level_2", "administrative_area_level_1", "country", "lat", "lng"]
      obtained_keys = json_body.first.keys
      expect((expected_keys - obtained_keys).size).to eq(0)
      expect((obtained_keys - expected_keys).size).to eq(0)
    end
  end

  describe 'POST create' do
    it "creates a location" do
      post :create, attributes_for(:location)
      expect(response.status).to eq(201)
    end
  end
end
