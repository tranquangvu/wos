class Api::V1::CrmsController < Api::V1::ApiController
  api :GET, '/v1/crms/verify_contact'
  param :phone_number, String, required: true
  param :target, ["web"]
  example <<-EOS
  For Chatbot
    {
        "redirect_to_blocks": [
            "verify"
        ]
    }

    or

    {
        "redirect_to_blocks": [
            "ordering"
        ]
    }

    or

    {
        "redirect_to_blocks": [
            "reverify"
        ]
    }

  For Web: `target=web`
   * if `phone_number` is existed
    {
        "status": "success",
        "data": "ordering"
    }
   * if `phone_number` is not existed
    {
        "status": "error",
        "data": "verify"
    }
   * if something is wrong
    {
        "status": "error",
        "data": "rephonenumber"
    }
  EOS
  def verify_contact
    if params[:phone_number].present?
      phone_number = Order.parse_phone_number params[:phone_number]
      client = CrmClient.new
      # code = client.verify_phonenumber "+84912878985"
      result = client.search_holders phone_number
      if result && result["Holders"].present?
        if result["Holders"]["Count"].to_i > 0
          # render json: { status: :success, data: { code_user: result["Login"]["Code_Use"], code_timeout: result["Login"]["Code_Timeout"], message: result["Login"]["Message"] }}
          if is_web?
            return render json: { status: :success, data: "ordering" }
          else
            return render json: { redirect_to_blocks: ["ordering"] }
          end
        else
          reg_res = client.register phone_number
          if reg_res && reg_res["Data"].present? && reg_res["Data"]["Message_ID"].present?
            if is_web?
              return render json: { status: :error, data: "verify" }
            else
              return render json: { redirect_to_blocks: ["verify"] }
            end
          end
        end
      end
    end
    
    if is_web?
      render json: { status: :error, error: "rephonenumber" }
    else
      render json: { redirect_to_blocks: ["rephonenumber"] }
    end
  end

  # api :GET, '/v1/crms/register'
  # param :phone_number, String, required: true
  # def register
  #   if params[:phone_number].present?
  #     client = CrmClient.new
  #     result = client.register params[:phone_number]
  #     if result && result["Data"].present?
  #       if result["Data"]["Message_ID"].present?
  #         render json: { status: :success, data: nil }
  #       else
  #         render json: { status: :error, error: { code: result["Data"]["ErrorCode"], text: result["Data"]["ErrorText"] }}
  #       end
  #       return
  #     end      
  #     render json: { status: :error, error: "Unknown error" }
  #     return
  #   end

  #   render json: { status: :error, error: "Phone number is required" }
  # end

  api :GET, '/v1/crms/confirm_register'
  param :phone_number, String, required: true
  param :auth_code, String, required: true
  param :target, ["web"]
  example <<-EOS
    For Chatbot
      {
          "redirect_to_blocks": [
              "reverify"
          ]
      }

      or

      {
          "redirect_to_blocks": [
              "ordering"
          ]
      }

      or

      {
          "redirect_to_blocks": [
              "rephonenumber"
          ]
      }

    For Web: `target=web`
     * if `auth_code` is correct
      {
          "status": "success",
          "data": "ordering"
      }
     * if `auth_code` is incorrect
      {
          "status": "error",
          "data": "reverify"
      }
     * if something is wrong
      {
          "status": "error",
          "data": "rephonenumber"
      }
  EOS
  def confirm_register
    if params[:auth_code].present? && params[:phone_number].present?
      phone_number = Order.parse_phone_number params[:phone_number]
      client = CrmClient.new
      result = client.confirm_register phone_number, params[:auth_code]
      # {"Holder"=>
      #   {"Message_ID"=>"0",
      #    "Holder_ID"=>"10000000000003",
      #    "Cards"=>{"Card"=>{"Card_Code"=>"1001"}},
      #    "Accounts"=>{"Account"=>[{"Account_Number"=>"02.00002.00000005.0001"}, {"Account_Number"=>"05.00001.00000006.0001"}]},
      #    "Contacts"=>{"Contact"=>{"Contact_ID"=>"10000000000005"}}}}      
      if result && result["Holder"].present?
        if is_web?
          return render json: { status: :success, data: "ordering" }
        else
          return render json: { redirect_to_blocks: ["ordering"] }
        end
      else
        # render json: { status: :error, error: { code: result["Data"]["ErrorCode"], text: result["Data"]["ErrorText"] } }
        if is_web?
          return render json: { status: :error, data: "reverify" }
        else
          render json: { redirect_to_blocks: ["reverify"] }
        end
      end
      return
    end

    if is_web?
      render json: { status: :error, error: "rephonenumber" }
    else
      render json: { redirect_to_blocks: ["rephonenumber"] }
    end
  end

  private

  def is_web?
    params[:target].present? && params[:target] == "web"
  end

end
