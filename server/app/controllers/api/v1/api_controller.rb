class Api::V1::ApiController < ActionController::API
  rescue_from Exception do |error|
    if Rails.env.development?
      raise error
    else
      render json: { stauts: :error, error: error.message }
    end
  end
end