class OrderXmlConverter

  DATE_FORMAT = "%FT%T%:z"

  def initialize
  end

  def to_xml(order)
    builder = Nokogiri::XML::Builder.new encoding: 'utf-8' do |xml|
      xml.Order {
        xml.OrderType id: order.order_type == "delivery" ? "1000652" : "1000491"
        case order.order_type
        when "delivery"
          # <?xml version="1.0" encoding="utf-8"?>
          # <Order>
          #   <OrderType id="1001562"/>
          #   <ExtSource source="120" extID="20001"/>
          #   <ExtSource source="{0BD7EAEA-7EA3-4508-BC5F-FC46926D0BE9}" extID="Dinh Phuong Tinh"/>
          #   <ExtSource source="{A598C6FD-E347-414C-8E40-E5B846973ACF}" extID="0919018389"/>
          #   <ExtSource source="{3EC5912C-168E-4D81-8E72-1B5460DE6971}" extID="Ho Chi Minh"/>
          #   <Session>
          #     <Payments>
          #       <Payment id="1" amount="15600000" extTransactionInfo=""/>
          #     </Payments>
          #     <Course code="0"/>
          #     <Dish id="1001313" quantity="2000" price="0">
          #     </Dish>
          #     <Dish id="1001348" quantity="1000">
          #       <Modi id="1001112" count="1" price="0" />
          #       <Modi id="1000221" count="1" price="0" />
          #     </Dish>
          #   </Session>
          #   <Delivery deliveryState="1" startTime="2017-09-14T16:20:00+03:00" travelTime="1899-12-30T00:15:00" deliveryTime="2017-09-14T17:20:00+03:00"
          #           zoneID="6" zoneName="HCM" orderPrefix="WEB_"/>
          # </Order>
          xml.ExtSource source: 120, extID: order.code
          xml.ExtSource source: "{9DAD899A-CDA3-42C3-8055-86C11401D63B}", extID: order.contact_name
          xml.ExtSource source: "{A598C6FD-E347-414C-8E40-E5B846973ACF}", extID: order.contact_phone_number
          xml.ExtSource source: "{2593A6C6-4E3A-47E3-8E9B-1748DB2A3D13}", extID: order.contact_address
          xml.Session do
            xml.Payments do
              xml.Payment id: "1", amount: format_price(order.total_amount), extTransactionInfo: ""
            end
            xml.Course code: "0"
            order.order_items.each do |item|
              xml.Dish id: item.item.code, quantity: item.quantity * 1000, price: format_price(item.price) do
                item.order_item_modififers.each do |mod|
                  xml.Modi id: mod.modifier.code, count: mod.quantity * 1000, price: format_price(mod.price)
                end
              end
            end
          end
          xml.Delivery deliveryState: "1", startTime: Time.now.strftime(DATE_FORMAT), travelTime: "1899-12-30T00:15:00", deliveryTime: (Time.now + 30.minutes).strftime(DATE_FORMAT), orderPrefix: "WEB_", zoneID: "6", zoneName: "HCM"
        when "take_away"
          # <?xml version="1.0" encoding="utf-8"?>
          # <Order>
          #   <OrderType id="1000680"/>
          #   <ExtSource source="120" extID="20002"/>
          #   <ExtSource source="{0BD7EAEA-7EA3-4508-BC5F-FC46926D0BE9}" extID="Dinh Phuong Tinh"/>
          #   <ExtSource source="{A598C6FD-E347-414C-8E40-E5B846973ACF}" extID="0919018389"/>
          #   <ExtSource source="{3EC5912C-168E-4D81-8E72-1B5460DE6971}" extID=""/>
          #   <Session>
          #     <Course code="0"/>
          #     <Dish id="1001313" quantity="2000" price="0">
          #     </Dish>
          #     <Dish id="1001348" quantity="1000">
          #       <Modi id="1001112" count="1" price="0" />
          #       <Modi id="1000221" count="1" price="0" />
          #     </Dish>
          #   </Session>
          # </Order>
          xml.ExtSource source: 120, extID: order.code
          xml.ExtSource source: "{9DAD899A-CDA3-42C3-8055-86C11401D63B}", extID: order.contact_name
          xml.ExtSource source: "{A598C6FD-E347-414C-8E40-E5B846973ACF}", extID: order.contact_phone_number
          # xml.ExtSource source: "{3EC5912C-168E-4D81-8E72-1B5460DE6971}", extID: order.contact_address
          xml.Session do
            xml.Course code: "0"
            order.order_items.each do |item|
              xml.Dish id: item.item.code, quantity: item.quantity * 1000, price: format_price(item.price) do
                item.order_item_modififers.each do |mod|
                  xml.Modi id: mod.modifier.code, count: mod.quantity * 1000, price: format_price(mod.price)
                end
              end
            end
          end
        end
      }
    end
    builder.to_xml
  end

  private

  def format_price(amount)
    (amount * 100).to_s.gsub('.0', '')
  end
end
