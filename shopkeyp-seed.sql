DROP DATABASE IF EXISTS shopkeyp;
CREATE DATABASE shopkeyp;

\c shopkeyp;

INSERT INTO users (username, password, is_admin)
  VALUES 
  ('Shopkeyp', 'password0', 'true'),
  ('Admin1', 'password1', 'true'),
  ('User2', 'password2', 'false');

INSERT INTO items (name, description, price, purchasable, created_by)
  VALUES 
  ('Jacket', 'A warm jacket.', 30, true, 1),
  ('Bottle', 'Unmarked bottle.', 10, false, 1),
  ('Compass', 'For navigation.', 15, true, 1);

INSERT INTO transactions (from_user, to_user, action, item_uuid, quantity, total, admin_id)
  VALUES
  (1, 3, 'purchase', 1, 1, 30, null),
  (2, 3, 'transfer', 2, 1, 0, 2);;

INSERT INTO user_items (user_id, item_uuid, quantity)
  VALUES
  (3, 1, 1);