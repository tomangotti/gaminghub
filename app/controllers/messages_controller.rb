class MessagesController < ApplicationController
    
    def index

        # messages = ObjectSpace.each_object(Message).select { |obj| Time.now - obj.created_at <= 5 * 60 }
        messages = Message.all
        
        render json: messages, status: :ok
    end

    def create
        message = Message.new(user_id: params[:user_id], body: params[:body], chatroom_id: params[:chatroom_id])
        if message.save
            broadcast_message(message)
            render json: message, status: :created
        end
    end




    private

    def message_params
        params.permit(:body, :user_id, :chatroom_id)
    end

    def broadcast_message(mess)
        ActionCable.server.broadcast('MessagesChannel', {
            id: mess.id,
            body: mess.body,
            user: mess.user
        })
    end
end
