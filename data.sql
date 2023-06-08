DROP DATABASE IF EXISTS shopkeyp;
CREATE DATABASE shopkeyp;

\c shopkeyp;

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username text UNIQUE,
    password text NOT NULL,
    profile_image text default 'https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=',
    balance integer default 0,
    is_admin boolean default false,
    active boolean default true,
    date_created timestamp default current_timestamp
);

INSERT INTO users (username, password, is_admin)
  VALUES 
  ('Shopkeyp', 'password0', 'true'),
  ('Admin1', 'password1', 'true'),
  ('User2', 'password2', 'false');

CREATE TABLE items (
    item_uuid SERIAL PRIMARY KEY,
    item_id SERIAL,
    name text NOT NULL,
    description text,
    item_image text default 'https://media.istockphoto.com/id/1193046540/vector/photo-coming-soon-image-icon-vector-illustration-isolated-on-white-background-no-website.jpg?s=612x612&w=0&k=20&c=4wx1UzigP0g9vJv9D_DmOxdAT_DtX5peZdoS4hi2Fqg=',
    price integer default 0,
    stock integer default 0,
    purchasable boolean default true,
    created_by integer references users,
    date_created timestamp default current_timestamp
);

INSERT INTO items (name, description, price, purchasable, created_by)
  VALUES 
  ('Jacket', 'A warm jacket.', 30, true, 1),
  ('Bottle', 'Unmarked bottle.', 10, false, 1),
  ('Compass', 'For navigation.', 15, true, 1);

CREATE TABLE transactions (
    transaction_id SERIAL PRIMARY KEY,
    from_user integer NOT NULL references users,
    to_user integer NOT NULL references users,
    action text NOT NULL,
    item_uuid integer references items,
    quantity integer default 0,
    total integer default 0,
    admin_id integer references users default NULL,
    transaction_date timestamp default current_timestamp
);

INSERT INTO transactions (from_user, to_user, action, item_uuid, quantity, total, admin_id)
  VALUES
  (1, 3, 'purchase', 1, 1, 30, null),
  (2, 3, 'transfer', 2, 1, 0, 2);;

CREATE TABLE user_items (
    user_id integer references users,
    item_uuid integer references items,
    quantity int NOT NULL,
    PRIMARY KEY(user_id, item_uuid)
);

INSERT INTO user_items (user_id, item_uuid, quantity)
  VALUES
  (3, 1, 1);