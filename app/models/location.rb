class Location < ApplicationRecord
  validates :lat, uniqueness: { scope: :lng }
end
