Rails.application.routes.draw do
  resources :game_reviews, only: [:create]
  
  mount ActionCable.server => "/cable"
  
  resources :messages
  resources :chatrooms
  resources :users, only: [:create, :index, :update]
  resources :abouts, only: [:show, :update, :create]
  resources :games, only: [:index, :show]
  resources :owned_games
  
  
  
  delete "/logout", to: "sessions#destroy"
  post '/login', to: "sessions#create"
  get '/me', to: "users#show_me"
end
