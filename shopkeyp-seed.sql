DROP DATABASE IF EXISTS shopkeyp;
CREATE DATABASE shopkeyp;

\c shopkeyp;

INSERT INTO users (username, password, is_admin)
  VALUES 
  ('Shopkeyp', 'password0', 'true'),
  ('Admin1', 'password1', 'true'),
  ('User2', 'password2', 'false');

INSERT INTO items (name, description, item_image, price, purchasable, created_by)
  VALUES 
  ('Holo Jacket', 'A holographic jacket.', 'https://cdn.discordapp.com/attachments/767917606988021770/927006603062956072/Holo_Jacket.png', 30, true, 1),
  ('Mystery Bottle', 'Tag says "drink me".', 'https://media.discordapp.net/attachments/731421741578059816/851895182692974592/Drink_Me.png?width=922&height=1334', 10, false, 1),
  ('Rose Compass', 'For navigation.', 'https://cdn.discordapp.com/attachments/762153696809058336/862029060859101184/Rose_Compass.png', 15, true, 1);

INSERT INTO transactions (from_user, to_user, action, item_uuid, quantity, total, admin_id)
  VALUES
  (1, 3, 'purchase', 1, 1, 30, null),
  (2, 3, 'transfer', 2, 1, 0, 2);;

INSERT INTO user_items (user_id, item_uuid, quantity)
  VALUES
  (3, 1, 1);