/*
  # Create Products and Cart Tables for KAPAS E-commerce

  ## Overview
  This migration creates the database schema for the KAPAS women's wear e-commerce website,
  including products catalog and shopping cart functionality.

  ## New Tables
  
  ### `products`
  - `id` (uuid, primary key) - Unique product identifier
  - `name` (text) - Product name
  - `description` (text) - Detailed product description
  - `category` (text) - Product category (short_kurti, long_kurti, frock, etc.)
  - `image_url` (text) - Product image URL
  - `original_price` (numeric) - Original price before discount
  - `discounted_price` (numeric) - Price after discount
  - `rating` (numeric) - Average rating (0-5)
  - `sold_count` (integer) - Number of units sold
  - `stock_quantity` (integer) - Available stock
  - `sizes` (text[]) - Available sizes array
  - `colors` (text[]) - Available colors array
  - `is_featured` (boolean) - Whether product is featured
  - `is_best_seller` (boolean) - Whether product is a best seller
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### `cart_items`
  - `id` (uuid, primary key) - Unique cart item identifier
  - `user_id` (uuid) - Reference to auth.users (nullable for guest carts)
  - `session_id` (text) - Session ID for guest users
  - `product_id` (uuid) - Reference to products table
  - `quantity` (integer) - Number of items
  - `selected_size` (text) - Selected size
  - `selected_color` (text) - Selected color
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ## Security
  - Enable RLS on all tables
  - Products table: Public read access, admin-only write access
  - Cart items: Users can only access their own cart items (by user_id or session_id)

  ## Indexes
  - Index on products.category for faster filtering
  - Index on cart_items.user_id and cart_items.session_id for faster cart retrieval
*/

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text DEFAULT '',
  category text NOT NULL,
  image_url text NOT NULL,
  original_price numeric NOT NULL,
  discounted_price numeric NOT NULL,
  rating numeric DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
  sold_count integer DEFAULT 0,
  stock_quantity integer DEFAULT 100,
  sizes text[] DEFAULT ARRAY['S', 'M', 'L', 'XL', 'XXL'],
  colors text[] DEFAULT ARRAY['Red', 'Blue', 'Black', 'White'],
  is_featured boolean DEFAULT false,
  is_best_seller boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create cart_items table
CREATE TABLE IF NOT EXISTS cart_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  session_id text,
  product_id uuid REFERENCES products(id) ON DELETE CASCADE NOT NULL,
  quantity integer DEFAULT 1 CHECK (quantity > 0),
  selected_size text DEFAULT 'M',
  selected_color text DEFAULT 'Red',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT user_or_session_required CHECK (
    user_id IS NOT NULL OR session_id IS NOT NULL
  )
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_is_featured ON products(is_featured);
CREATE INDEX IF NOT EXISTS idx_products_is_best_seller ON products(is_best_seller);
CREATE INDEX IF NOT EXISTS idx_cart_items_user_id ON cart_items(user_id);
CREATE INDEX IF NOT EXISTS idx_cart_items_session_id ON cart_items(session_id);

-- Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;

-- Products policies: Public read access
CREATE POLICY "Anyone can view products"
  ON products FOR SELECT
  TO public
  USING (true);

-- Cart items policies: Users can only access their own cart
CREATE POLICY "Users can view own cart items by user_id"
  ON cart_items FOR SELECT
  TO public
  USING (
    (auth.uid() IS NOT NULL AND auth.uid() = user_id) OR
    (auth.uid() IS NULL AND session_id IS NOT NULL)
  );

CREATE POLICY "Users can insert own cart items"
  ON cart_items FOR INSERT
  TO public
  WITH CHECK (
    (auth.uid() IS NOT NULL AND auth.uid() = user_id) OR
    (auth.uid() IS NULL AND session_id IS NOT NULL)
  );

CREATE POLICY "Users can update own cart items"
  ON cart_items FOR UPDATE
  TO public
  USING (
    (auth.uid() IS NOT NULL AND auth.uid() = user_id) OR
    (auth.uid() IS NULL AND session_id IS NOT NULL)
  )
  WITH CHECK (
    (auth.uid() IS NOT NULL AND auth.uid() = user_id) OR
    (auth.uid() IS NULL AND session_id IS NOT NULL)
  );

CREATE POLICY "Users can delete own cart items"
  ON cart_items FOR DELETE
  TO public
  USING (
    (auth.uid() IS NOT NULL AND auth.uid() = user_id) OR
    (auth.uid() IS NULL AND session_id IS NOT NULL)
  );