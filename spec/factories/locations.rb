FactoryGirl.define do
  factory :location do
    address { "#Faker::Address.street_address #Faker::Address.city, #Faker::Address.state_abbr"}
    lat     { Faker::Address.latitude }
    lng     { Faker::Address.longitude }
  end
end
