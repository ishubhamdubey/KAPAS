import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

if (!supabaseUrl || !supabaseAnonKey) {
  // Avoid crashing the whole app; log clearly so it can be fixed.
  // The client will be created with harmless placeholders; queries will fail but UI will still render.
  // Ensure .env has VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY, then restart Vite.
  console.error('Missing Supabase environment variables. Check your .env and restart the dev server.');
}

export const supabase = createClient(
  supabaseUrl || 'https://example.com',
  supabaseAnonKey || 'anon'
);

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  image_url: string;
  original_price: number;
  discounted_price: number;
  rating: number;
  sold_count: number;
  stock_quantity: number;
  sizes: string[];
  colors: string[];
  is_featured: boolean;
  is_best_seller: boolean;
  created_at: string;
  updated_at: string;
}

export interface CartItem {
  id: string;
  user_id?: string;
  session_id?: string;
  product_id: string;
  quantity: number;
  selected_size: string;
  selected_color: string;
  created_at: string;
  updated_at: string;
  products?: Product;
}
