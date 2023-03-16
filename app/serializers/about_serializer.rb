class AboutSerializer < ActiveModel::Serializer
  attributes :id, :bio, :background_image, :image
  has_one :user
end
