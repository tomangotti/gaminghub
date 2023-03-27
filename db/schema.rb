# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_03_27_155157) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "abouts", force: :cascade do |t|
    t.string "bio"
    t.string "background_image"
    t.string "image"
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_abouts_on_user_id"
  end

  create_table "chatrooms", force: :cascade do |t|
    t.string "room_name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "game_reviews", force: :cascade do |t|
    t.string "review"
    t.bigint "game_id", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["game_id"], name: "index_game_reviews_on_game_id"
    t.index ["user_id"], name: "index_game_reviews_on_user_id"
  end

  create_table "games", force: :cascade do |t|
    t.string "name"
    t.string "image"
    t.string "about"
    t.string "creater"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "link"
    t.bigint "user_id"
    t.index ["user_id"], name: "index_games_on_user_id"
  end

  create_table "high_score_boards", force: :cascade do |t|
    t.integer "score"
    t.string "name"
    t.bigint "game_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["game_id"], name: "index_high_score_boards_on_game_id"
  end

  create_table "messages", force: :cascade do |t|
    t.string "body"
    t.bigint "user_id", null: false
    t.bigint "chatroom_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["chatroom_id"], name: "index_messages_on_chatroom_id"
    t.index ["user_id"], name: "index_messages_on_user_id"
  end

  create_table "owned_games", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "game_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["game_id"], name: "index_owned_games_on_game_id"
    t.index ["user_id"], name: "index_owned_games_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "first_name"
    t.string "last_name"
    t.string "email"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "abouts", "users"
  add_foreign_key "game_reviews", "games"
  add_foreign_key "game_reviews", "users"
  add_foreign_key "games", "users"
  add_foreign_key "high_score_boards", "games"
  add_foreign_key "messages", "chatrooms"
  add_foreign_key "messages", "users"
  add_foreign_key "owned_games", "games"
  add_foreign_key "owned_games", "users"
end
