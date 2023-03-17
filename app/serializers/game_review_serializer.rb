class GameReviewSerializer < ActiveModel::Serializer
  attributes :id, :review
  has_one :game
  has_one :user
end
