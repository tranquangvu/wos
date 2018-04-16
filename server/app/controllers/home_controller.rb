class HomeController < ApplicationController
  def welcome
    render json: { message: "Welcome" }, status: 200
  end
end
