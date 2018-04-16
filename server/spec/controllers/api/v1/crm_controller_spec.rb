require 'rails_helper'

RSpec.describe Api::V1::CrmController, type: :controller do

  describe "GET #verify_contact" do
    it "returns http success" do
      get :verify_contact
      expect(response).to have_http_status(:success)
    end
  end

end
