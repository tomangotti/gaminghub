class AboutsController < ApplicationController


    def show
        user = User.find(params[:id])
        render json: user, serializer: UserWithAboutSerializer
    end

    def create
        user = User.find(session[:user_id])
        about = About.create(about_params)
        render json: user, serializer: UserWithAboutSerializer
    end

    def update
        about = About.find(params[:id])
        about.update(about_params)
        render json: about, status: :ok
    end

    private 

    def about_params
        params.permit(:bio, :background_image, :image, :user_id, :id)
    end
end
