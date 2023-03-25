class AddColumnToGame < ActiveRecord::Migration[7.0]
  def change
    add_column :games, :link, :string
  end
end
