Rails.application.routes.draw do
  root 'home#welcome'
  apipie
  namespace :api do
    namespace :v1 do
      resources :menu, only: [:index]
      resources :items, only: [:index, :show] do
        resources :modifier_groups, controller: 'items/modifier_groups'
      end
      resources :modifiers, only: [:index]
      resources :coupons, only: [:index, :show] do
        collection do
          get :find
        end
      end
      resources :orders, only: [:index, :create] do
        collection do
          get :current
          post :complete
        end
      end
      resources :shops
      resources :crms, only: []  do
        collection do
          get :verify_contact
          # get :register
          get :confirm_register
        end
      end
    end
  end
end
