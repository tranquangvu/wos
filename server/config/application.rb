require_relative 'boot'

require "rails"
# Pick the frameworks you want:
require "active_model/railtie"
require "active_job/railtie"
require "active_record/railtie"
require "action_controller/railtie"
require "action_mailer/railtie"
require "action_view/railtie"
require "action_cable/engine"
# require "sprockets/railtie"
require "rails/test_unit/railtie"

Bundler.require(*Rails.groups)

module Wos
  class Application < Rails::Application
    config.load_defaults 5.1
    config.api_only = true
    config.enable_dependency_loading = true
    config.autoload_paths << Rails.root.join('lib')

    config.active_job.queue_adapter = :sucker_punch
  end
end
