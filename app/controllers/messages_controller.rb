class MessagesController < ApplicationController
    
    def index
        messages = Message.all
        render json: messages, status: :ok
    end

    def create
        message = Message.create(message_params)
        broadcast_message(message)
        render json: message, status: :created
    end




    private

    def message_params
        params.permit(:body, :user_id, :chatroom_id)
    end

    def broadcast_message(mess)
        ActionCable.server.broadcast('MessagesChannel', {
            id: mess.id,
            body: mess.body
        })
    end
end
