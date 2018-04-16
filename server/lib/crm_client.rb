require 'uri'
require 'net/http'
require 'builder'

BASE_URL = 'http://118.69.108.41:50034/api/crm/OneHTTPService'

class CrmClient
  # include HTTParty
  def initialize
    @uri = URI.parse(BASE_URL)
  end

  def search_holders(number)
    
    # url = "http://118.69.108.41:50034/api/crm/OneHTTPService"
    body = <<-EOS
      <?xml version="1.0" encoding="utf-8" standalone="yes" ?>
      <Message Action="Search holders 2" Terminal_Type="72134" Global_Type="ABC" Unit_ID="1" 
      User_ID="1">
      <Include>Holder_Contact</Include> 
      <Count>1</Count>
      <Index>1</Index>
      <Item Mode="Clear"/>
      <Item Mode="Add">
      <Contacts>
      <Phone Value="#{number}" IsNumber="True"/>
      </Contacts>
      </Item>
      <Item Mode="Clear"/>
      </Message>
    EOS
    
    make_request body
  end

  def request_login(number)
    
    # url = "http://118.69.108.41:50034/api/crm/OneHTTPService"
    body = <<-EOS
      <?xml version="1.0" encoding="utf-8" standalone="yes" ?>
      <Message Action="Login" Terminal_Type="72134" Global_Type="ABC" Unit_ID="1" User_ID="1">
      <Login>#{number}</Login>
      <Include>Code_Timeout</Include>
      </Message>
    EOS
    
    make_request body
  end

  def register(number)

    body = <<-EOS
      <?xml version="1.0" encoding="utf-8" standalone="yes" ?>
      <Message Action="Registration" Terminal_Type="72134" Global_Type="ABC" Unit_ID="1" User_ID="1">
      <Login>#{number}</Login>
      <Include></Include>
      </Message>
    EOS
    make_request body
  end

  def confirm_register(number, auth_code)
    body = <<-EOS
      <?xml version="1.0" encoding="utf-8" standalone="yes" ?>
      <Message Action="Registration" Terminal_Type="72134" Global_Type="ABC" Unit_ID="1" User_ID="1">
      <Login>#{number}</Login>
      <Auth_Code>#{auth_code}</Auth_Code>
      </Message>
    EOS
    make_request body
  end

  private

  def make_request(body)
    http = Net::HTTP.new(@uri.host, @uri.port)
    request = Net::HTTP::Post.new(@uri.request_uri)
    request.body = body
    response = http.request(request)

    # return response
    if response.code == "200"
      return Hash.from_xml response.body
    end
    return false
  end
end