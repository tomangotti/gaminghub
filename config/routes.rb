Rails.application.routes.draw do
 
  mount ActionCable.server => "/cable"
  
  resources :messages
  resources :chatrooms
  resources :users, only: [:create, :index, :update]
  resources :abouts, only: [:show, :update, :create]
  

  delete "/logout", to: "sessions#destroy"
  post '/login', to: "sessions#create"
  get '/me', to: "users#show_me"
end
