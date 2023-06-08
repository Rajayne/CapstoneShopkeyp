CREATE TABLE users (
    userId SERIAL PRIMARY KEY,
    username VARCHAR(25) UNIQUE,
    password text NOT NULL,
    profileImage TEXT DEFAULT 'https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=',
    balance INTEGER CHECK (balance >= 0) DEFAULT 0,
    isAdmin BOOLEAN NOT NULL DEFAULT false,
    active BOOLEAN NOT NULL DEFAULT true,
    dateCreated TIMESTAMP DEFAULT current_timestamp
);

CREATE TABLE items (
    itemUuid SERIAL PRIMARY KEY,
    itemId SERIAL NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    itemImage TEXT CHECK (position('.' IN itemImage) > 1) DEFAULT 'https://media.istockphoto.com/id/1193046540/vector/photo-coming-soon-image-icon-vector-illustration-isolated-on-white-background-no-website.jpg?s=612x612&w=0&k=20&c=4wx1UzigP0g9vJv9D_DmOxdAT_DtX5peZdoS4hi2Fqg=',
    price INTEGER CHECK (price >= 0) DEFAULT 0,
    stock INTEGER CHECK (stock >= 0) DEFAULT 0,
    purchasable BOOLEAN DEFAULT true,
    createdBy INTEGER REFERENCES users,
    dateCreated TIMESTAMP DEFAULT current_timestamp
);

CREATE TABLE transactions (
    transactionId SERIAL PRIMARY KEY,
    fromUser INTEGER NOT NULL REFERENCES users,
    toUser INTEGER NOT NULL REFERENCES users,
    action TEXT NOT NULL,
    itemUuid INTEGER REFERENCES items,
    quantity INTEGER CHECK (quantity >= 0) DEFAULT 0,
    total INTEGER CHECK (quantity >= 0) DEFAULT 0,
    adminId INTEGER REFERENCES users DEFAULT NULL,
    transactionDate TIMESTAMP DEFAULT current_timestamp
);

CREATE TABLE user_items (
    userId INTEGER REFERENCES users,
    itemUuid INTEGER REFERENCES items,
    quantity INTEGER CHECK (quantity >= 0) NOT NULL,
    PRIMARY KEY(userId, itemUuid)
);
