import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';
import { generateAdminOrderNotificationHTML, generateOrderConfirmationHTML } from '@/lib/emailTemplates';

export async function POST(request: NextRequest) {
  try {
    const { order, method } = await request.json();
    
    const notifications: any = { success: true, methods: [] };
    
    // WhatsApp notification (using WhatsApp API link)
    if (method === 'whatsapp' || method === 'both') {
      const whatsappMessage = `New Order #${order.id}

Customer: ${order.customerName}
Phone: ${order.customerPhone}
Email: ${order.customerEmail}
Address: ${order.customerAddress}

Items:
${order.items.map((item: any) => `- ${item.productName} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`).join('\n')}

Total: $${order.totalAmount}

Order Date: ${new Date(order.createdAt).toLocaleString()}`;
      
      const encodedMessage = encodeURIComponent(whatsappMessage);
      const whatsappNumber = '919566060685';
      const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
      
      notifications.methods.push({
        type: 'whatsapp',
        link: whatsappLink,
        message: 'WhatsApp notification link generated'
      });
      
      console.log('WhatsApp Link:', whatsappLink);
    }
    
    // Email notification to admin
    if (method === 'email' || method === 'both') {
      const adminEmail = 'srhealthychoice22@gmail.com';
      
      try {
        const adminEmailHTML = generateAdminOrderNotificationHTML(order);
        
        const adminResult = await sendEmail({
          to: adminEmail,
          subject: `🛍️ New Order #${order.id} - Action Required`,
          html: adminEmailHTML,
        });
        
        if (adminResult.success) {
          notifications.methods.push({
            type: 'email',
            to: adminEmail,
            subject: `New Order #${order.id}`,
            messageId: adminResult.messageId,
            message: 'Admin notification email sent successfully'
          });
          console.log('✅ Admin email sent:', adminResult.messageId);
        } else {
          notifications.methods.push({
            type: 'email',
            to: adminEmail,
            error: adminResult.error,
            message: 'Failed to send admin email'
          });
          console.error('❌ Admin email failed:', adminResult.error);
        }
      } catch (emailError) {
        console.error('Admin email error:', emailError);
        notifications.methods.push({
          type: 'email',
          to: adminEmail,
          error: emailError instanceof Error ? emailError.message : 'Unknown error',
          message: 'Admin email error'
        });
      }
      
      // Send confirmation email to customer
      try {
        const customerEmailHTML = generateOrderConfirmationHTML(order);
        
        const customerResult = await sendEmail({
          to: order.customerEmail,
          subject: `✅ Order Confirmation #${order.id}`,
          html: customerEmailHTML,
        });
        
        if (customerResult.success) {
          notifications.methods.push({
            type: 'email',
            to: order.customerEmail,
            subject: `Order Confirmation #${order.id}`,
            messageId: customerResult.messageId,
            message: 'Customer confirmation email sent successfully'
          });
          console.log('✅ Customer email sent:', customerResult.messageId);
        } else {
          notifications.methods.push({
            type: 'email',
            to: order.customerEmail,
            error: customerResult.error,
            message: 'Failed to send customer email'
          });
          console.error('❌ Customer email failed:', customerResult.error);
        }
      } catch (emailError) {
        console.error('Customer email error:', emailError);
        notifications.methods.push({
          type: 'email',
          to: order.customerEmail,
          error: emailError instanceof Error ? emailError.message : 'Unknown error',
          message: 'Customer email error'
        });
      }
    }
    
    return NextResponse.json(notifications);
  } catch (error) {
    console.error('Error sending notification:', error);
    return NextResponse.json({ error: 'Failed to send notification' }, { status: 500 });
  }
}