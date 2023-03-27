class UsersController < ApplicationController
    skip_before_action :authorize, only: :create

    def create
        user = User.create!(user_params)
        about = About.create(bio: "Bio has not been updated", user_id: user.id, image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png", background_image: "https://img.freepik.com/premium-vector/random-geometric-shapes-pattern-abstract-background-geometrical-simple-illustration-creative-ans-luxury-style_510351-3974.jpg?w=2000")
        session[:user_id] = user.id
        render json: user, serializer: UserWithAboutSerializer
    end

    def show_me
        user = User.find_by(id: session[:user_id])
        render json: user, serializer: UserWithAboutSerializer
    end

    def index
        users = User.all
        render json: users, status: :ok
    end

    def update
        user = User.find(params[:id])
        user.update(user_params)
        render json: user, serializer: UserWithAboutSerializer
    end

    def destroy
        user = User.find(params[:id])
        user.destroy
        session.delete :user_id
        head :no_content
    end

    private

    def user_params
        params.permit(:username, :first_name, :last_name, :password, :password_confirmation, :email, :id)
    end
end
