class HighScoreBoardSerializer < ActiveModel::Serializer
  attributes :id, :score, :name
  has_one :game
end
