# 📧 Email Notification Setup Guide

Your e-commerce platform is now configured to automatically send order notifications via email and WhatsApp when customers place orders.

## 🎯 What Happens When a Customer Places an Order

1. **Admin Email Notification** → Sent to `srhealthychoice22@gmail.com`
   - Beautiful HTML email with complete order details
   - Customer contact information
   - Order items and total amount
   - Direct WhatsApp link to contact customer

2. **Customer Confirmation Email** → Sent to customer's email
   - Professional order confirmation
   - Order summary and delivery address
   - Your contact details

3. **WhatsApp Link** → Generated automatically
   - Pre-filled message with order details
   - Click to send to +91 95660 60685

---

## 🔧 Gmail Setup (Required for Email Notifications)

### Step 1: Enable 2-Factor Authentication

1. Go to your Google Account: https://myaccount.google.com/security
2. Under "Signing in to Google", click **2-Step Verification**
3. Follow the prompts to verify your phone number
4. Complete 2FA setup

### Step 2: Generate Gmail App Password

1. Return to: https://myaccount.google.com/security
2. Scroll to **App passwords** (only visible after 2FA is enabled)
3. Click **App passwords**
4. For "Select app": Choose **Mail**
5. For "Select device": Choose **Other (custom name)**
6. Type: `SR Healthy Choice Orders`
7. Click **Generate**
8. **Copy the 16-character password** (format: `xxxx xxxx xxxx xxxx`)

### Step 3: Add to Environment Variables

1. Open the `.env.local` file in your project root
2. Add your credentials:

```env
EMAIL_USER=srhealthychoice22@gmail.com
EMAIL_PASS=xxxx xxxx xxxx xxxx
```

Replace `xxxx xxxx xxxx xxxx` with the App Password you just generated.

3. **Save the file**
4. **Restart your development server** for changes to take effect

---

## ⚠️ Important Notes

- **NEVER use your regular Gmail password** - Google will reject it
- **MUST use App Password** - This is a special password for applications
- The App Password is 16 characters with spaces (e.g., `abcd efgh ijkl mnop`)
- Keep your `.env.local` file secure and never commit it to Git (it's already in .gitignore)
- Gmail has a limit of **500 emails per day**

---

## ✅ Testing the Email System

After setting up your Gmail credentials:

1. Go to your website
2. Add a product to cart
3. Complete the checkout process
4. Check:
   - **Your Gmail inbox** (srhealthychoice22@gmail.com) - You should receive the admin notification
   - **Customer's email** - They should receive the order confirmation
   - **Server logs** - Look for success messages

---

## 🐛 Troubleshooting

### "EMAIL_USER and EMAIL_PASS environment variables are required"
- Make sure you added both variables to `.env.local`
- Restart your dev server after adding them

### "Invalid login: 535-5.7.8 Username and Password not accepted"
- You're using your regular Gmail password instead of App Password
- Generate a new App Password and use that instead

### "2-Step Verification is required"
- Enable 2FA on your Google Account first
- App Passwords only work with 2FA enabled

### Emails not sending
- Check server logs for error messages
- Verify your App Password is correct (no extra spaces)
- Make sure `EMAIL_USER` matches your Gmail address exactly

---

## 📱 WhatsApp Integration

WhatsApp notifications work automatically without any setup:
- Pre-filled message links are generated for each order
- Clicking the link opens WhatsApp with order details
- Messages are sent to: +91 95660 60685

No API key or additional configuration needed!

---

## 🎨 Email Templates

The system includes two professional HTML email templates:

1. **Admin Notification Email**
   - Eye-catching purple gradient header
   - Complete customer information
   - Itemized order details
   - Total amount highlighted
   - WhatsApp quick action button

2. **Customer Confirmation Email**
   - Friendly green gradient header
   - Order summary
   - Delivery address confirmation
   - Your business contact details

Both templates are fully responsive and work on all email clients!

---

## 📊 What to Expect

Once configured, every order will trigger:
- ✅ 2 emails sent automatically (admin + customer)
- ✅ 1 WhatsApp notification link generated
- ✅ Complete order details in both notifications
- ✅ Professional, branded email designs

No manual intervention required - everything happens automatically when customers checkout!
