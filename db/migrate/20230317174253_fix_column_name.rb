class FixColumnName < ActiveRecord::Migration[7.0]
  def change
    rename_column :owned_games, :games_id, :game_id
  end
end
