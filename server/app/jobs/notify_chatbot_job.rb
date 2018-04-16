class NotifyChatbotJob < ApplicationJob
  queue_as :default
  include SuckerPunch::Job
  
  def perform(order_id)
    order = Order.find order_id

    #https://api.chatfuel.com/bots/59c667dae4b0b12dd864cf8f/users/1227906303981968/send?chatfuel_token=mELtlMAHYqR0BvgEiMq8zVek3uYUK3OJMbtyrdNPTrQB9ndV0fM7lWTFZbM4MZvD&chatfuel_block_name=order_detail&order_num=12345
    if order.present?
      ChatbotClient.ping order.client_id, order.user_id, order.code
    end
  end
end
