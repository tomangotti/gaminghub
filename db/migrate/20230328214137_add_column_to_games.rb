class AddColumnToGames < ActiveRecord::Migration[7.0]
  def change
    add_column :games, :github, :string
  end
end
