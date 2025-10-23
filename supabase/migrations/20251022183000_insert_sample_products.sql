-- Seed sample products for all 6 categories so category pages have data
-- Safe to run multiple times; uses simple name+category uniqueness check to avoid duplicates

DO $$
DECLARE
  rec RECORD;
BEGIN
  -- Short Kurtis
  FOR rec IN SELECT * FROM (VALUES
    ('Aanya Short Kurti', 'short_kurti', '/images/fullsleeve_cream.png', 1399, 999, 4.4, 256, 45, ARRAY['S','M','L','XL'], ARRAY['Cream','Red','Black'], true, true),
    ('Naira Cotton Short Kurti', 'short_kurti', '/images/fullsleeve_cream.png', 1599, 1199, 4.2, 198, 60, ARRAY['S','M','L','XL'], ARRAY['Cream','Pink','Blue'], false, false),
    ('Ira Printed Short Kurti', 'short_kurti', '/images/fullsleeve_cream.png', 1299, 899, 4.1, 173, 80, ARRAY['S','M','L','XL'], ARRAY['Cream','Maroon'], false, false),
    ('Myra Everyday Short Kurti', 'short_kurti', '/images/fullsleeve_cream.png', 1499, 1099, 4.5, 289, 35, ARRAY['S','M','L','XL'], ARRAY['Cream','Green'], true, false)
  ) AS t(name, category, image_url, original_price, discounted_price, rating, sold_count, stock_quantity, sizes, colors, is_featured, is_best_seller) LOOP
    INSERT INTO products (name, description, category, image_url, original_price, discounted_price, rating, sold_count, stock_quantity, sizes, colors, is_featured, is_best_seller)
    SELECT rec.name, 'Comfortable and stylish daily wear.', rec.category, rec.image_url, rec.original_price, rec.discounted_price, rec.rating, rec.sold_count, rec.stock_quantity, rec.sizes, rec.colors, rec.is_featured, rec.is_best_seller
    WHERE NOT EXISTS (SELECT 1 FROM products p WHERE p.name = rec.name AND p.category = rec.category);
  END LOOP;

  -- Long Kurtis
  FOR rec IN SELECT * FROM (VALUES
    ('Anika Long Kurti', 'long_kurti', '/images/category_longkurti.png', 1999, 1499, 4.6, 320, 50, ARRAY['S','M','L','XL','XXL'], ARRAY['Blue','Cream','Black'], true, true),
    ('Siya Flared Long Kurti', 'long_kurti', '/images/category_longkurti.png', 1899, 1399, 4.3, 210, 70, ARRAY['S','M','L','XL','XXL'], ARRAY['Blue','White'], false, false),
    ('Dia Straight Long Kurti', 'long_kurti', '/images/category_longkurti.png', 1799, 1299, 4.1, 165, 90, ARRAY['S','M','L','XL','XXL'], ARRAY['Black','Maroon'], false, false),
    ('Rhea Anarkali Kurti', 'long_kurti', '/images/category_longkurti.png', 2199, 1699, 4.7, 410, 40, ARRAY['S','M','L','XL','XXL'], ARRAY['Blue','Pink'], true, false)
  ) AS t(name, category, image_url, original_price, discounted_price, rating, sold_count, stock_quantity, sizes, colors, is_featured, is_best_seller) LOOP
    INSERT INTO products (name, description, category, image_url, original_price, discounted_price, rating, sold_count, stock_quantity, sizes, colors, is_featured, is_best_seller)
    SELECT rec.name, 'Elegant and comfortable long kurti.', rec.category, rec.image_url, rec.original_price, rec.discounted_price, rec.rating, rec.sold_count, rec.stock_quantity, rec.sizes, rec.colors, rec.is_featured, rec.is_best_seller
    WHERE NOT EXISTS (SELECT 1 FROM products p WHERE p.name = rec.name AND p.category = rec.category);
  END LOOP;

  -- Frocks
  FOR rec IN SELECT * FROM (VALUES
    ('Zara Summer Frock', 'frock', '/images/frock white.png', 1699, 1199, 4.5, 245, 55, ARRAY['S','M','L','XL'], ARRAY['Cream','Pink'], true, false),
    ('Kiara Floral Frock', 'frock', '/images/frock white.png', 1599, 1099, 4.2, 198, 70, ARRAY['S','M','L','XL'], ARRAY['White','Red'], false, false),
    ('Mira Casual Frock', 'frock', '/images/frock white.png', 1499, 999, 4.0, 150, 80, ARRAY['S','M','L','XL'], ARRAY['Cream','Blue'], false, false),
    ('Tara Party Frock', 'frock', '/images/frock white.png', 1999, 1499, 4.6, 305, 45, ARRAY['S','M','L','XL'], ARRAY['Peach','White'], true, true)
  ) AS t(name, category, image_url, original_price, discounted_price, rating, sold_count, stock_quantity, sizes, colors, is_featured, is_best_seller) LOOP
    INSERT INTO products (name, description, category, image_url, original_price, discounted_price, rating, sold_count, stock_quantity, sizes, colors, is_featured, is_best_seller)
    SELECT rec.name, 'Breathable, flowy and elegant frock.', rec.category, rec.image_url, rec.original_price, rec.discounted_price, rec.rating, rec.sold_count, rec.stock_quantity, rec.sizes, rec.colors, rec.is_featured, rec.is_best_seller
    WHERE NOT EXISTS (SELECT 1 FROM products p WHERE p.name = rec.name AND p.category = rec.category);
  END LOOP;

  -- Full Sleeve Kurtis
  FOR rec IN SELECT * FROM (VALUES
    ('Nysa Full Sleeve Kurti', 'full_sleeve', '/images/fullsleeve_red.png', 1699, 1199, 4.3, 220, 60, ARRAY['S','M','L','XL','XXL'], ARRAY['Red','Black','Cream'], true, false),
    ('Aarvi Solid Full Sleeve', 'full_sleeve', '/images/fullsleeve_red.png', 1599, 1099, 4.1, 180, 80, ARRAY['S','M','L','XL','XXL'], ARRAY['Red','Blue'], false, false),
    ('Kaira Work Full Sleeve', 'full_sleeve', '/images/fullsleeve_red.png', 1899, 1399, 4.4, 265, 50, ARRAY['S','M','L','XL','XXL'], ARRAY['Maroon','Cream'], false, true),
    ('Reva Rayon Full Sleeve', 'full_sleeve', '/images/fullsleeve_red.png', 1499, 999, 4.0, 140, 100, ARRAY['S','M','L','XL','XXL'], ARRAY['Red','Green'], false, false)
  ) AS t(name, category, image_url, original_price, discounted_price, rating, sold_count, stock_quantity, sizes, colors, is_featured, is_best_seller) LOOP
    INSERT INTO products (name, description, category, image_url, original_price, discounted_price, rating, sold_count, stock_quantity, sizes, colors, is_featured, is_best_seller)
    SELECT rec.name, 'Classic full-sleeve comfort.', rec.category, rec.image_url, rec.original_price, rec.discounted_price, rec.rating, rec.sold_count, rec.stock_quantity, rec.sizes, rec.colors, rec.is_featured, rec.is_best_seller
    WHERE NOT EXISTS (SELECT 1 FROM products p WHERE p.name = rec.name AND p.category = rec.category);
  END LOOP;

  -- Sleeveless Kurtis
  FOR rec IN SELECT * FROM (VALUES
    ('Pihu Sleeveless Kurti', 'sleeveless', '/images/category_sleevless.jpg', 1399, 999, 4.1, 160, 70, ARRAY['S','M','L','XL'], ARRAY['Beige','Pink'], false, false),
    ('Riya Summer Sleeveless', 'sleeveless', '/images/category_sleevless.jpg', 1499, 1099, 4.3, 210, 65, ARRAY['S','M','L','XL'], ARRAY['White','Blue'], true, false), 
    ('Isha Flowy Sleeveless', 'sleeveless', '/images/category_sleevless.jpg', 1599, 1199, 4.2, 185, 60, ARRAY['S','M','L','XL'], ARRAY['Cream','Red'], false, false),
    ('Sara Chic Sleeveless', 'sleeveless', '/images/category_sleevless.jpg', 1699, 1299, 4.4, 230, 55, ARRAY['S','M','L','XL'], ARRAY['Peach','White'], false, true)
  ) AS t(name, category, image_url, original_price, discounted_price, rating, sold_count, stock_quantity, sizes, colors, is_featured, is_best_seller) LOOP
    INSERT INTO products (name, description, category, image_url, original_price, discounted_price, rating, sold_count, stock_quantity, sizes, colors, is_featured, is_best_seller)
    SELECT rec.name, 'Lightweight and airy sleeveless kurti.', rec.category, rec.image_url, rec.original_price, rec.discounted_price, rec.rating, rec.sold_count, rec.stock_quantity, rec.sizes, rec.colors, rec.is_featured, rec.is_best_seller
    WHERE NOT EXISTS (SELECT 1 FROM products p WHERE p.name = rec.name AND p.category = rec.category);
  END LOOP;

  -- Backless Kurtis
  FOR rec IN SELECT * FROM (VALUES
    ('Avni Backless Kurti', 'backless', '/images/category_backless.png', 1899, 1399, 4.5, 260, 45, ARRAY['S','M','L','XL'], ARRAY['Beige','Brown'], true, false),
    ('Tanishi Elegant Backless', 'backless', '/images/category_backless.png', 1999, 1499, 4.6, 280, 40, ARRAY['S','M','L','XL'], ARRAY['Cream','Black'], true, true),
    ('Misha Festive Backless', 'backless', '/images/category_backless.png', 1799, 1299, 4.2, 190, 60, ARRAY['S','M','L','XL'], ARRAY['Pink','White'], false, false),
    ('Nisha Casual Backless', 'backless', '/images/category_backless.png', 1699, 1199, 4.0, 150, 75, ARRAY['S','M','L','XL'], ARRAY['Blue','Beige'], false, false)
  ) AS t(name, category, image_url, original_price, discounted_price, rating, sold_count, stock_quantity, sizes, colors, is_featured, is_best_seller) LOOP
    INSERT INTO products (name, description, category, image_url, original_price, discounted_price, rating, sold_count, stock_quantity, sizes, colors, is_featured, is_best_seller)
    SELECT rec.name, 'Graceful backless kurti with modern design.', rec.category, rec.image_url, rec.original_price, rec.discounted_price, rec.rating, rec.sold_count, rec.stock_quantity, rec.sizes, rec.colors, rec.is_featured, rec.is_best_seller
    WHERE NOT EXISTS (SELECT 1 FROM products p WHERE p.name = rec.name AND p.category = rec.category);
  END LOOP;
END $$;
