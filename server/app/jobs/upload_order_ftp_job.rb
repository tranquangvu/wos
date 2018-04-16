class UploadOrderFtpJob < ApplicationJob
  queue_as :default
  include SuckerPunch::Job

  def perform(order_id)
    # Do something later
    order = Order.find order_id
    path = Rails.root.join('tmp', 'order_xmls', "#{order.code}.xml")
    upload_to_ftp order, path

    puts "-------------------------DONE UPLOAD ORDER---------------------------------"
  end

  def upload_to_ftp(order, path)
    file = Rails.root.join(path).to_s
    require 'net/ftp'
    Net::FTP.send(:remove_const, 'FTP_PORT') # just to avoid warnings
    Net::FTP.const_set('FTP_PORT', 21000)
    Net::FTP.open('210.245.17.50', 'dcorp_user', 'zxc@123') do |ftp|
      ftp.passive = true
      ftp.putbinaryfile file
    end
  rescue => e
    Rails.logger.error e.message
  end
end
