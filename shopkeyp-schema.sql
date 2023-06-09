CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(25) UNIQUE,
    password text NOT NULL,
    profile_image TEXT CHECK (position('.' IN profile_image) > 1) DEFAULT 'https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=',
    balance INTEGER CHECK (balance >= 0) DEFAULT 0,
    is_admin BOOLEAN NOT NULL DEFAULT false,
    active BOOLEAN NOT NULL DEFAULT true,
    date_created TIMESTAMP DEFAULT current_timestamp
);

CREATE TABLE items (
    item_uuid SERIAL NOT NULL,
    item_id SERIAL PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    item_image TEXT CHECK (position('.' IN item_image) > 1) DEFAULT 'https://media.istockphoto.com/id/1193046540/vector/photo-coming-soon-image-icon-vector-illustration-isolated-on-white-background-no-website.jpg?s=612x612&w=0&k=20&c=4wx1UzigP0g9vJv9D_DmOxdAT_DtX5peZdoS4hi2Fqg=',
    price INTEGER CHECK (price >= 0) DEFAULT 0,
    stock INTEGER CHECK (stock >= 0) DEFAULT 0,
    purchasable BOOLEAN DEFAULT true,
    created_by INTEGER REFERENCES users ON DELETE CASCADE,
    date_created TIMESTAMP DEFAULT current_timestamp
);

CREATE TABLE transactions (
    transaction_id SERIAL PRIMARY KEY,
    from_user INTEGER NOT NULL REFERENCES users ON DELETE CASCADE,
    to_user INTEGER NOT NULL REFERENCES users ON DELETE CASCADE,
    action TEXT NOT NULL,
    item_id INTEGER REFERENCES items ON DELETE CASCADE,
    quantity INTEGER CHECK (quantity >= 0) DEFAULT 0,
    total INTEGER CHECK (quantity >= 0) DEFAULT 0,
    admin_id INTEGER REFERENCES users ON DELETE CASCADE DEFAULT NULL,
    transaction_date TIMESTAMP DEFAULT current_timestamp
);

CREATE TABLE user_items (
    user_id INTEGER REFERENCES users ON DELETE CASCADE,
    item_id INTEGER REFERENCES items ON DELETE CASCADE,
    quantity INTEGER CHECK (quantity >= 0) NOT NULL,
    PRIMARY KEY(user_id, item_id)
);
