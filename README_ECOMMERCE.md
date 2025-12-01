# ShopHub E-commerce Platform

A complete e-commerce website with admin panel, product management, shopping cart, and cash-on-delivery checkout with WhatsApp/email notifications.

## 🚀 Features

### Customer Features
- **Product Browsing**: View all products with image gallery and featured products on homepage
- **Product Details**: Detailed product pages with images, descriptions, pricing, and stock info
- **Shopping Cart**: Add/remove items, update quantities, persistent cart storage
- **Cash on Delivery**: Simple checkout process with COD payment option
- **Order Notifications**: Automatic WhatsApp and email notifications to admin

### Admin Features
- **Secure Login**: Protected admin panel with authentication (default: admin/admin123)
- **Product Management**: 
  - Add new products with images, prices, discounts, stock levels
  - Edit existing products
  - Delete products
  - Mark products as featured
- **Order Management**: 
  - View all customer orders
  - Update order status (pending, processing, completed, cancelled)
  - Customer contact information and delivery addresses

## 📁 Project Structure

```
├── src/
│   ├── app/
│   │   ├── admin/
│   │   │   ├── login/          # Admin login page
│   │   │   ├── dashboard/      # Admin dashboard
│   │   │   ├── products/       # Product management
│   │   │   └── orders/         # Order management
│   │   ├── products/
│   │   │   ├── [id]/          # Product detail page
│   │   │   └── page.tsx       # All products listing
│   │   ├── cart/              # Shopping cart page
│   │   ├── checkout/          # Checkout page
│   │   ├── order-success/     # Order confirmation page
│   │   ├── api/
│   │   │   ├── products/      # Product API routes
│   │   │   ├── orders/        # Order API routes
│   │   │   ├── admin/         # Admin auth API
│   │   │   └── notifications/ # Notification API
│   │   └── page.tsx           # Homepage with featured products
│   ├── components/
│   │   ├── Navbar.tsx         # Navigation with cart counter
│   │   └── ui/                # Shadcn UI components
│   ├── contexts/
│   │   └── CartContext.tsx    # Shopping cart state management
│   └── lib/
│       └── storage.ts         # File-based data storage
├── data/                      # Auto-generated data storage
│   ├── products.json
│   ├── orders.json
│   └── admin.json
```

## 🛠️ Setup Instructions

### 1. Install Dependencies
```bash
npm install
# or
bun install
```

### 2. Run Development Server
```bash
npm run dev
# or
bun dev
```

Visit [http://localhost:3000](http://localhost:3000)

### 3. Access Admin Panel
1. Go to [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
2. Default credentials:
   - **Username**: admin
   - **Password**: admin123

## 📝 How to Use

### For Store Owners (Admin)

1. **Login to Admin Panel**
   - Navigate to `/admin/login`
   - Use default credentials (admin/admin123)

2. **Add Products**
   - Go to "Product Management" from dashboard
   - Click "Add Product"
   - Fill in product details:
     - Name, description, category
     - Price and optional discount price
     - Stock quantity
     - Image URL (use Unsplash or any image URL)
     - Toggle "Featured" to show on homepage

3. **Manage Products**
   - Edit existing products
   - Delete products
   - Update stock levels

4. **View Orders**
   - Go to "Orders" from dashboard
   - View customer details and order items
   - Update order status as you process them

### For Customers

1. **Browse Products**
   - Visit homepage to see featured products
   - Go to "Products" page to see all items
   - Click on any product for details

2. **Add to Cart**
   - Click "Add to Cart" on product cards
   - Adjust quantities in cart
   - Cart persists in browser storage

3. **Checkout**
   - Click "Proceed to Checkout" from cart
   - Fill in delivery information
   - Place order (Cash on Delivery)
   - Receive order confirmation

## 🔔 Notifications

### WhatsApp Notifications
When a customer places an order, the system generates a WhatsApp message link with order details. Configure your admin WhatsApp number:

```bash
# Add to .env.local
ADMIN_WHATSAPP_NUMBER=1234567890  # Your number with country code
```

### Email Notifications
Email notifications are logged to console. To enable actual email sending, integrate with:
- SendGrid
- Resend
- AWS SES
- Nodemailer

Configure email:
```bash
# Add to .env.local
ADMIN_EMAIL=admin@yourdomain.com
```

## 🎨 Customization

### Update Store Name
Edit `src/components/Navbar.tsx` and `src/app/layout.tsx`

### Change Colors/Theme
Edit `src/app/globals.css` - modify the CSS variables

### Add More Product Categories
Simply enter different categories when adding products

### Change Admin Credentials
Modify `src/lib/storage.ts` default admin object, or create an admin update API route

## 💾 Data Storage

The app uses **file-based JSON storage** in the `data/` folder:
- `products.json` - All products
- `orders.json` - All orders
- `admin.json` - Admin credentials

**Note**: For production, migrate to a proper database (PostgreSQL, MongoDB, etc.)

## 🔒 Security Notes

⚠️ **Important for Production**:
1. Hash admin passwords (use bcrypt)
2. Implement proper JWT authentication
3. Add HTTPS
4. Use environment variables for sensitive data
5. Migrate to proper database
6. Add CSRF protection
7. Rate limiting for API routes

## 📱 Responsive Design

The entire application is fully responsive and works on:
- 📱 Mobile phones
- 📱 Tablets
- 💻 Desktops

## 🚀 Deployment

### Deploy to Vercel
```bash
vercel deploy
```

### Environment Variables (Production)
```env
ADMIN_WHATSAPP_NUMBER=your_number
ADMIN_EMAIL=your_email@domain.com
```

## 🛣️ Available Routes

### Customer Routes
- `/` - Homepage with featured products
- `/products` - All products listing
- `/products/[id]` - Product detail page
- `/cart` - Shopping cart
- `/checkout` - Checkout page
- `/order-success` - Order confirmation

### Admin Routes
- `/admin/login` - Admin login
- `/admin/dashboard` - Admin dashboard
- `/admin/products` - Product management
- `/admin/orders` - Order management

### API Routes
- `GET/POST /api/products` - Products CRUD
- `GET/PUT/DELETE /api/products/[id]` - Single product
- `GET/POST /api/orders` - Orders CRUD
- `PATCH /api/orders/[id]` - Update order status
- `POST /api/admin/login` - Admin authentication
- `POST /api/notifications` - Send notifications

## 🎯 Next Steps

To enhance the platform, consider adding:
- [ ] User authentication for customers
- [ ] Order tracking for customers
- [ ] Product reviews and ratings
- [ ] Search and filter functionality
- [ ] Multiple product images
- [ ] Payment gateway integration (Stripe, PayPal)
- [ ] Email templates for notifications
- [ ] Analytics dashboard
- [ ] Inventory management
- [ ] Discount codes/coupons

## 📞 Support

For issues or questions:
1. Check console logs for errors
2. Verify all dependencies are installed
3. Ensure dev server is running
4. Check that data folder has write permissions

---

**Default Admin Credentials**: admin / admin123

Built with Next.js 15, TypeScript, Tailwind CSS, and Shadcn UI.
