class ChatbotClient
  def self.ping(client_id, user_id, order_code)
    url = "https://api.chatfuel.com/bots/#{client_id}/users/#{user_id}/send?chatfuel_token=#{ENV["CHATFUEL_TOKEN"]}&chatfuel_block_name=order_detail&order_num=#{order_code}"
    # url = "https://api.chatfuel.com/bots/59c667dae4b0b12dd864cf8f/users/1267802696676262/send?chatfuel_token=mELtlMAHYqR0BvgEiMq8zVek3uYUK3OJMbtyrdNPTrQB9ndV0fM7lWTFZbM4MZvD&chatfuel_block_name=order_detail&order_num=12345"
    res = Excon.post(url, :body => '')
    Rails.logger.info res.body
    res.body
  end
end