import { promises as fs } from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  stock: number;
  image: string;
  category: string;
  featured: boolean;
  createdAt: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}

export interface Admin {
  username: string;
  password: string; // In production, this should be hashed
}

async function ensureDataDir() {
  try {
    await fs.access(DATA_DIR);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
  }
}

async function readJSON<T>(filename: string, defaultValue: T): Promise<T> {
  await ensureDataDir();
  const filePath = path.join(DATA_DIR, filename);
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch {
    return defaultValue;
  }
}

async function writeJSON<T>(filename: string, data: T): Promise<void> {
  await ensureDataDir();
  const filePath = path.join(DATA_DIR, filename);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

// Products
export async function getProducts(): Promise<Product[]> {
  return readJSON<Product[]>('products.json', []);
}

export async function getProduct(id: string): Promise<Product | null> {
  const products = await getProducts();
  return products.find(p => p.id === id) || null;
}

export async function createProduct(product: Omit<Product, 'id' | 'createdAt'>): Promise<Product> {
  const products = await getProducts();
  const newProduct: Product = {
    ...product,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  products.push(newProduct);
  await writeJSON('products.json', products);
  return newProduct;
}

export async function updateProduct(id: string, updates: Partial<Product>): Promise<Product | null> {
  const products = await getProducts();
  const index = products.findIndex(p => p.id === id);
  if (index === -1) return null;
  
  products[index] = { ...products[index], ...updates };
  await writeJSON('products.json', products);
  return products[index];
}

export async function deleteProduct(id: string): Promise<boolean> {
  const products = await getProducts();
  const filtered = products.filter(p => p.id !== id);
  if (filtered.length === products.length) return false;
  
  await writeJSON('products.json', filtered);
  return true;
}

// Orders
export async function getOrders(): Promise<Order[]> {
  return readJSON<Order[]>('orders.json', []);
}

export async function getOrder(id: string): Promise<Order | null> {
  const orders = await getOrders();
  return orders.find(o => o.id === id) || null;
}

export async function createOrder(order: Omit<Order, 'id' | 'createdAt' | 'status'>): Promise<Order> {
  const orders = await getOrders();
  const newOrder: Order = {
    ...order,
    id: Date.now().toString(),
    status: 'pending',
    createdAt: new Date().toISOString(),
  };
  orders.push(newOrder);
  await writeJSON('orders.json', orders);
  return newOrder;
}

export async function updateOrderStatus(id: string, status: Order['status']): Promise<Order | null> {
  const orders = await getOrders();
  const index = orders.findIndex(o => o.id === id);
  if (index === -1) return null;
  
  orders[index].status = status;
  await writeJSON('orders.json', orders);
  return orders[index];
}

// Admin
export async function getAdmin(): Promise<Admin> {
  return readJSON<Admin>('admin.json', { username: 'admin', password: 'admin123' });
}

export async function verifyAdmin(username: string, password: string): Promise<boolean> {
  const admin = await getAdmin();
  return admin.username === username && admin.password === password;
}
