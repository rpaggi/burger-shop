-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2016-06-14 14:30:55.352

-- tables
-- Table: clients
CREATE TABLE clients (
    id int NOT NULL AUTO_INCREMENT,
    name varchar(50) NOT NULL,
    address varchar(150) NOT NULL,
    number varchar(20) NOT NULL,
    complement varchar(20) NULL,
    city varchar(60) NOT NULL,
    state varchar(2) NOT NULL,
    zipcode int NOT NULL,
    phone1 int NOT NULL,
    phone2 int NOT NULL,
    hincl timestamp NOT NULL,
    UNIQUE INDEX unique_key (phone1),
    CONSTRAINT clients_pk PRIMARY KEY (id)
);

CREATE INDEX index_id ON clients (id);

CREATE INDEX index_phone ON clients (phone1);

-- Table: logins
CREATE TABLE logins(
    id int(11) NOT NULL AUTO_INCREMENT,
    name varchar(50) NOT NULL,
    `user` varchar(25) NOT NULL,
    password varchar(40) NOT NULL,
    profile int(11) NOT NULL,
    token varchar(50) NULL DEFAULT NULL,
    last_login timestamp NOT NULL,
    hincl timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE INDEX UNI (`user`),
    CONSTRAINT logins_pk PRIMARY KEY (id)
) ENGINE InnoDB;

CREATE INDEX INDEX1 ON logins (id);

CREATE INDEX FK_logins_profiles ON logins (profile);

-- Table: order_itens
CREATE TABLE order_itens (
    id int NOT NULL AUTO_INCREMENT,
    product_id int NOT NULL,
    order_id int NOT NULL,
    note varchar(150) NOT NULL,
    hincl timestamp NOT NULL,
    CONSTRAINT order_itens_pk PRIMARY KEY (id)
);

-- Table: order_sources
CREATE TABLE order_sources (
    id int NOT NULL AUTO_INCREMENT,
    name varchar(30) NOT NULL,
    CONSTRAINT order_sources_pk PRIMARY KEY (id)
);

-- Table: orders
CREATE TABLE orders (
    id int NOT NULL AUTO_INCREMENT,
    order_source int NOT NULL,
    table_id int NULL,
    client_id int NULL,
    user_id int(11) NOT NULL,
    hincl timestamp NOT NULL,
    CONSTRAINT orders_pk PRIMARY KEY (id)
);

-- Table: products
CREATE TABLE products (
    id int NOT NULL AUTO_INCREMENT,
    name varchar(50) NOT NULL,
    description varchar(500) NULL,
    value_sell double(8,2) NOT NULL,
    hincl timestamp NOT NULL,
    CONSTRAINT products_pk PRIMARY KEY (id)
);

CREATE INDEX index_id ON products (id);

CREATE INDEX index_name ON products (name);

CREATE INDEX index_value_sell ON products (value_sell);

-- Table: profiles
CREATE TABLE profiles (
    id int(11) NOT NULL,
    name varchar(50) NOT NULL,
    UNIQUE INDEX UNI (id),
    CONSTRAINT profiles_pk PRIMARY KEY (id)
) ENGINE InnoDB CHARACTER SET latin1;

CREATE INDEX INDEX1 ON profiles (id);

-- Table: tables
CREATE TABLE tables (
    id int NOT NULL,
    name int NOT NULL,
    UNIQUE INDEX `unique` (id),
    CONSTRAINT tables_pk PRIMARY KEY (id)
);

-- foreign keys
-- Reference: FK_logins_profiles (table: logins)
ALTER TABLE logins ADD CONSTRAINT FK_logins_profiles FOREIGN KEY FK_logins_profiles (profile)
    REFERENCES profiles (id);

-- Reference: order_itens_orders (table: order_itens)
ALTER TABLE order_itens ADD CONSTRAINT order_itens_orders FOREIGN KEY order_itens_orders (order_id)
    REFERENCES orders (id);

-- Reference: order_itens_products (table: order_itens)
ALTER TABLE order_itens ADD CONSTRAINT order_itens_products FOREIGN KEY order_itens_products (product_id)
    REFERENCES products (id);

-- Reference: orders_clients (table: orders)
ALTER TABLE orders ADD CONSTRAINT orders_clients FOREIGN KEY orders_clients (client_id)
    REFERENCES clients (id);

-- Reference: orders_logins (table: orders)
ALTER TABLE orders ADD CONSTRAINT orders_logins FOREIGN KEY orders_logins (user_id)
    REFERENCES logins (id);

-- Reference: orders_order_sources (table: orders)
ALTER TABLE orders ADD CONSTRAINT orders_order_sources FOREIGN KEY orders_order_sources (order_source)
    REFERENCES order_sources (id);

-- Reference: orders_tables (table: orders)
ALTER TABLE orders ADD CONSTRAINT orders_tables FOREIGN KEY orders_tables (table_id)
    REFERENCES tables (id);

-- End of file.

