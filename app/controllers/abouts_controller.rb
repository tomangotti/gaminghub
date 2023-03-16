class AboutsController < ApplicationController


    def show
        user = User.find(params[:id])
        render json: user, serializer: UserWithAboutSerializer
    end
end
