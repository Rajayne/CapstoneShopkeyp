DROP DATABASE IF EXISTS shopkeyp;
CREATE DATABASE shopkeyp;

\c shopkeyp;
-- password0, password1, password2
INSERT INTO users (username, password, is_admin)
  VALUES 
  ('Shopkeyp', '$2a$13$1U2XPY9X5BArR8geCSSurejbImN5DV1kzVWix2prCIovX051pT5fG', 'true'),
  ('TestAdmin', '$2a$13$eSnNeLRCQ5SfWXu5vxVhz.97VhJnhlvnl2WChYEddNRtzc2Zi73Mq', 'true'),
  ('TestUser', '$2a$13$M1eNI7FzMHr48q4/0alin.JtSWx0uxpc2ZpTQvExZPtaB8uHbB//u', 'false');

INSERT INTO items (name, description, item_image, price, stock, purchasable, created_by)
  VALUES 
  ('Holo Jacket', 'A holographic jacket.', 'https://cdn.discordapp.com/attachments/767917606988021770/927006603062956072/Holo_Jacket.png', 30, 1, true, 1),
  ('Mystery Bottle', 'Tag says "drink me".', 'https://media.discordapp.net/attachments/731421741578059816/851895182692974592/Drink_Me.png?width=922&height=1334', 10, 3, false, 1),
  ('Rose Compass', 'For navigation.', 'https://cdn.discordapp.com/attachments/762153696809058336/862029060859101184/Rose_Compass.png', 15, 2, true, 1);

INSERT INTO transactions (from_user, to_user, action, item_id, quantity, total, admin_id)
  VALUES
  (1, 3, 'purchase', 1, 1, 30, null),
  (2, 3, 'transfer', 2, 1, 0, 2);;

INSERT INTO user_items (user_id, item_id, quantity)
  VALUES
  (3, 1, 1);