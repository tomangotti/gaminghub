# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)


# u1 = User.create(username: "TOOLBOSS", first_name: "Thomas", last_name: "Angotti", email: "NotARealEmail@gmail.com", password: "1234")
# u2 = User.create(username: "beetsBearsBattleStarGalatica", first_name: "Dwight", last_name: "Schrut", email: "NotARealEmail@gmail.com", password: "1234")
# u3 = User.create(username: "WorldsBestBoss15", first_name: "Micheal", last_name: "Scott", email: "NotARealEmail@gmail.com", password: "1234")
# u4 = User.create(username: "Pickles", first_name: "Josiah", last_name: "Storrie", email: "NotARealEmail@gmail.com", password: "1234")
# u5 = User.create(username: "AlterEgo", first_name: "Thomas", last_name: "Ryan", email: "NotARealEmail@gmail.com", password: "1234")

# c1 = Chatroom.create(room_name: "Main Chatroom")
# 25.times do
#     Message.create(body: Faker::Quote.famous_last_words, user_id: User.all.sample.id, chatroom_id: c1.id)
# end

# Game.create(name: "Halo Infinite", image: "https://upload.wikimedia.org/wikipedia/en/1/14/Halo_Infinite.png", about: "Play as master chief and fight the banished!", creater: "343i")
# Game.create(name: "The Legend of Zelda: Breath of the Wild", image: "https://assets-prd.ignimgs.com/2022/06/14/zelda-breath-of-the-wild-1655249167687.jpg", about: "Play as Link, explore hyrule, defeat ganon and save Zelda", creater: "Nintendo")


puts "seeeeeding"
OwnedGame.create(user_id: 1, game_id: 1)
puts "SEEding done"