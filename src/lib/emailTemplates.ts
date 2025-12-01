interface OrderItem {
  productName: string;
  quantity: number;
  price: number;
}

interface OrderData {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  items: OrderItem[];
  totalAmount: number;
  createdAt: string;
}

export function generateAdminOrderNotificationHTML(data: OrderData): string {
  const itemsHTML = data.items
    .map(
      (item) => `
    <tr style="border-bottom: 1px solid #e5e5e5;">
      <td style="padding: 12px 8px; font-size: 14px;">${item.productName}</td>
      <td style="padding: 12px 8px; font-size: 14px; text-align: center;">${item.quantity}</td>
      <td style="padding: 12px 8px; font-size: 14px; text-align: right; font-weight: bold;">$${(item.price * item.quantity).toFixed(2)}</td>
    </tr>
  `
    )
    .join('');

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width" />
        <style>
          body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background-color: #f5f5f5;
            margin: 0;
            padding: 0;
          }
          .container { 
            max-width: 600px; 
            margin: 20px auto; 
            background: white;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
          .header { 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px 20px;
            text-align: center;
          }
          .header h1 {
            margin: 0;
            font-size: 28px;
          }
          .badge {
            display: inline-block;
            background: rgba(255,255,255,0.2);
            padding: 6px 12px;
            border-radius: 20px;
            font-size: 12px;
            margin-top: 10px;
          }
          .content { 
            padding: 30px 20px;
          }
          .info-section {
            background: #f9fafb;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
          }
          .info-row {
            display: flex;
            margin: 10px 0;
          }
          .info-label {
            font-weight: bold;
            color: #374151;
            min-width: 120px;
          }
          .info-value {
            color: #6b7280;
          }
          .items-table { 
            width: 100%; 
            margin: 20px 0;
            border-collapse: collapse;
          }
          .items-table th {
            background: #f3f4f6;
            padding: 12px 8px;
            text-align: left;
            font-weight: 600;
            color: #374151;
            border-bottom: 2px solid #e5e7eb;
          }
          .total-section {
            background: #fef3c7;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
          }
          .total-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .total-label {
            font-size: 18px;
            font-weight: bold;
            color: #374151;
          }
          .total-amount {
            font-size: 24px;
            font-weight: bold;
            color: #059669;
          }
          .footer { 
            background: #f9fafb;
            color: #6b7280;
            font-size: 12px;
            padding: 20px;
            text-align: center;
            border-top: 1px solid #e5e7eb;
          }
          .action-buttons {
            text-align: center;
            margin: 30px 0;
          }
          .button {
            display: inline-block;
            background: #667eea;
            color: white;
            padding: 12px 24px;
            border-radius: 6px;
            text-decoration: none;
            font-weight: 600;
            margin: 0 10px;
          }
          .button-whatsapp {
            background: #25D366;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🛍️ New Order Received!</h1>
            <div class="badge">Order #${data.id}</div>
          </div>

          <div class="content">
            <p style="font-size: 16px; color: #374151;">A new order has been placed and requires your attention.</p>

            <div class="info-section">
              <h3 style="margin-top: 0; color: #374151;">Customer Information</h3>
              <div class="info-row">
                <span class="info-label">👤 Name:</span>
                <span class="info-value">${data.customerName}</span>
              </div>
              <div class="info-row">
                <span class="info-label">📧 Email:</span>
                <span class="info-value">${data.customerEmail}</span>
              </div>
              <div class="info-row">
                <span class="info-label">📱 Phone:</span>
                <span class="info-value">${data.customerPhone}</span>
              </div>
              <div class="info-row">
                <span class="info-label">📍 Address:</span>
                <span class="info-value">${data.customerAddress}</span>
              </div>
              <div class="info-row">
                <span class="info-label">🕐 Order Time:</span>
                <span class="info-value">${new Date(data.createdAt).toLocaleString()}</span>
              </div>
            </div>

            <h3 style="color: #374151;">Order Items</h3>
            <table class="items-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th style="text-align: center;">Quantity</th>
                  <th style="text-align: right;">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHTML}
              </tbody>
            </table>

            <div class="total-section">
              <div class="total-row">
                <span class="total-label">💰 Total Amount:</span>
                <span class="total-amount">$${data.totalAmount.toFixed(2)}</span>
              </div>
            </div>

            <div class="action-buttons">
              <a href="https://wa.me/919566060685?text=${encodeURIComponent(`New Order #${data.id}\n\nCustomer: ${data.customerName}\nPhone: ${data.customerPhone}\nAddress: ${data.customerAddress}\n\nTotal: $${data.totalAmount.toFixed(2)}`)}" class="button button-whatsapp">
                Contact Customer on WhatsApp
              </a>
            </div>

            <p style="background: #eff6ff; padding: 15px; border-radius: 6px; color: #1e40af; font-size: 14px;">
              💡 <strong>Next Steps:</strong> Review the order details and contact the customer to confirm delivery details for this cash-on-delivery order.
            </p>
          </div>

          <div class="footer">
            <p>This is an automated notification from SR Healthy Choice</p>
            <p>Gandhi Nagar, Vellore | 📧 srhealthychoice22@gmail.com | 📱 +91 95660 60685</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

export function generateOrderConfirmationHTML(data: OrderData): string {
  const itemsHTML = data.items
    .map(
      (item) => `
    <tr style="border-bottom: 1px solid #e5e5e5;">
      <td style="padding: 12px 8px; font-size: 14px;">${item.productName}</td>
      <td style="padding: 12px 8px; font-size: 14px; text-align: center;">${item.quantity}</td>
      <td style="padding: 12px 8px; font-size: 14px; text-align: right; font-weight: bold;">$${(item.price * item.quantity).toFixed(2)}</td>
    </tr>
  `
    )
    .join('');

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width" />
        <style>
          body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background-color: #f5f5f5;
            margin: 0;
            padding: 0;
          }
          .container { 
            max-width: 600px; 
            margin: 20px auto; 
            background: white;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
          .header { 
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            color: white;
            padding: 30px 20px;
            text-align: center;
          }
          .header h1 {
            margin: 0;
            font-size: 28px;
          }
          .content { 
            padding: 30px 20px;
          }
          .items-table { 
            width: 100%; 
            margin: 20px 0;
            border-collapse: collapse;
          }
          .items-table th {
            background: #f3f4f6;
            padding: 12px 8px;
            text-align: left;
            font-weight: 600;
            color: #374151;
            border-bottom: 2px solid #e5e7eb;
          }
          .total { 
            font-size: 20px;
            font-weight: bold;
            margin-top: 20px;
            text-align: right;
            color: #059669;
          }
          .footer { 
            background: #f9fafb;
            color: #6b7280;
            font-size: 12px;
            padding: 20px;
            text-align: center;
            border-top: 1px solid #e5e7eb;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✅ Order Confirmed!</h1>
          </div>

          <div class="content">
            <p style="font-size: 16px;">Hi <strong>${data.customerName}</strong>,</p>
            <p style="color: #6b7280;">Thank you for your order! We've received your order and will contact you shortly to confirm delivery details.</p>

            <div style="background: #f3f4f6; padding: 15px; border-radius: 6px; margin: 20px 0;">
              <p style="margin: 5px 0;"><strong>Order Number:</strong> #${data.id}</p>
              <p style="margin: 5px 0;"><strong>Order Date:</strong> ${new Date(data.createdAt).toLocaleString()}</p>
              <p style="margin: 5px 0;"><strong>Payment Method:</strong> Cash on Delivery</p>
            </div>

            <h3 style="color: #374151;">Order Items</h3>
            <table class="items-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th style="text-align: center;">Quantity</th>
                  <th style="text-align: right;">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHTML}
              </tbody>
            </table>

            <div class="total">
              Total: $${data.totalAmount.toFixed(2)}
            </div>

            <div style="background: #eff6ff; padding: 15px; border-radius: 6px; margin: 20px 0;">
              <p style="margin: 0; color: #1e40af;">
                <strong>Delivery Address:</strong><br/>
                ${data.customerAddress}
              </p>
            </div>

            <p style="color: #6b7280; font-size: 14px;">
              We'll contact you at <strong>${data.customerPhone}</strong> to coordinate delivery.
            </p>
          </div>

          <div class="footer">
            <p>Questions? Contact us:</p>
            <p>📧 srhealthychoice22@gmail.com | 📱 +91 95660 60685</p>
            <p>📍 Gandhi Nagar, Vellore</p>
          </div>
        </div>
      </body>
    </html>
  `;
}
