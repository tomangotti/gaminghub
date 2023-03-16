class CreateAbouts < ActiveRecord::Migration[7.0]
  def change
    create_table :abouts do |t|
      t.string :bio
      t.string :background_image
      t.string :image
      t.belongs_to :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
