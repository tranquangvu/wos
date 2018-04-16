CarrierWave.configure do |config|
  config.asset_host = Rails.application.secrets.asset_host
end
