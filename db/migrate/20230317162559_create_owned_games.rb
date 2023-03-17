class CreateOwnedGames < ActiveRecord::Migration[7.0]
  def change
    create_table :owned_games do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.belongs_to :games, null: false, foreign_key: true

      t.timestamps
    end
  end
end
