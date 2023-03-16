class UsersController < ApplicationController
    skip_before_action :authorize, only: :create

    def create
        user = User.create!(user_params)
        session[:user_id] = user.id
        render json: user
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


    private

    def user_params
        params.permit(:username, :first_name, :last_name, :password, :password_confirmation, :email, :id)
    end
end
