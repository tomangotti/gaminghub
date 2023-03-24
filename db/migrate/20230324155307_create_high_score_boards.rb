class CreateHighScoreBoards < ActiveRecord::Migration[7.0]
  def change
    create_table :high_score_boards do |t|
      t.integer :score
      t.string :name
      t.belongs_to :game, null: false, foreign_key: true

      t.timestamps
    end
  end
end
