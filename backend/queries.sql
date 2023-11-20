DROP TABLE IF EXISTS ad;
CREATE TABLE ad 
(
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	title VARCHAR(100) NOT NULL,
	description TEXT,
	owner VARCHAR(100) NOT NULL,
	price INT,
    picture VARCHAR(100),
    location VARCHAR(100),
	createdAt DATE,
    category_id INT DEFAULT NULL,
    CONSTRAINT fk_category FOREIGN KEY (category_id)
        REFERENCES category (id)
         ON DELETE SET NULL
);

DROP TABLE IF EXISTS category;
CREATE TABLE category 
(
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	name VARCHAR(100) NOT NULL
);

INSERT INTO ad (`title`, `description`, `owner`, `price`, `picture`, `location`, `createdAt`, `category_id`) VALUES 
    ('Bicycle', 'My bike is blue, working fine. I''m selling it because I''ve got a new one', 'bike.seller@gmail.com', 100, 'https://www.example.com/bicycle.jpg','Paris', '2023-09-01', 2),
    ('Car', 'My car is blue, working fine. I''m selling it because I''ve got a new one', 'car.seller@gmail.com', 10000, 'https://www.example.com/car.jpg', 'Paris', '2023-10-05', 2),
    ('Blouson', 'Bon état', 'robert@dupont.fr', 20, 'https://image.fr/blouson.jpg', 'Lyon', '2023-09-05', 1),
    ('Private Jet', 'My plane is white, good for travels', 'plane.seller@gmail.com', 10000000, 'https://www.example.com/jet.jpg', 'Paris', '2023-10-10', 2),
    ('Smartphone', 'Brand new smartphone for sale', 'john.doe@gmail.com', 500, 'https://www.example.com/smartphone.jpg', 'Paris', '2023-11-15', 3),
    ('Guitar', 'Acoustic guitar in great condition', 'musiclover@gmail.com', 300, 'https://www.example.com/guitar.jpg', 'Bordeaux', '2023-11-16', 3),
    ('Coffee Maker', 'High-quality coffee maker for sale', 'coffeeenthusiast@gmail.com', 50, 'https://www.example.com/coffeemaker.jpg', 'Lyon', '2023-11-17', 3),
    ('Laptop', 'Powerful laptop with latest features', 'techgeek@gmail.com', 800, 'https://www.example.com/laptop.jpg', 'Paris', '2023-11-18', 3),
    ('Bookshelf', 'Wooden bookshelf in excellent condition', 'bookworm@gmail.com', 150, 'https://www.example.com/bookshelf.jpg', 'Bordeaux', '2023-11-19', 3),
    ('Sunglasses', 'Designer sunglasses, never worn', 'fashionista@gmail.com', 80, 'https://www.example.com/sunglasses.jpg', 'Lyon', '2023-11-20', 3),
    ('Watch', 'Luxury watch, brand new', 'watchcollector@gmail.com', 1000, 'https://www.example.com/watch.jpg', 'Paris', '2023-11-21', 3),
    ('Barbecue Grill', 'High-performance barbecue grill', 'grillmaster@gmail.com', 200, 'https://www.example.com/barbecue.jpg', 'Bordeaux', '2023-11-22', 3),
    ('Headphones', 'Wireless headphones with noise cancellation', 'musiclover2@gmail.com', 150, 'https://www.example.com/headphones.jpg', 'Lyon', '2023-11-23', 3),
    ('Desk Chair', 'Ergonomic desk chair for home office', 'officepro@gmail.com', 120, 'https://www.example.com/deskchair.jpg', 'Paris', '2023-11-24', 3),
    ('Television', 'Smart TV with 4K resolution', 'tvlover@gmail.com', 700, 'https://www.example.com/television.jpg', 'Bordeaux', '2023-11-25', 3),
    ('Running Shoes', 'Brand new running shoes, size 10', 'runnersworld@gmail.com', 80, 'https://www.example.com/runningshoes.jpg', 'Lyon', '2023-11-26', 3),
    ('Backpack', 'Durable backpack for outdoor adventures', 'adventureseeker@gmail.com', 50, 'https://www.example.com/backpack.jpg', 'Paris', '2023-11-27', 3),
    ('Digital Camera', 'High-resolution digital camera', 'photographer@gmail.com', 400, 'https://www.example.com/camera.jpg', 'Bordeaux', '2023-11-28', 3),
    ('Tennis Racket', 'Professional-grade tennis racket', 'tennisplayer@gmail.com', 100, 'https://www.example.com/tennisracket.jpg', 'Lyon', '2023-11-29', 3),
    ('Microwave', 'Compact microwave oven in excellent condition', 'kitchenlover@gmail.com', 30, 'https://www.example.com/microwave.jpg', 'Paris', '2023-11-30', 3),
    ('Video game', 'Brand new game', 'techgeek@gmail.com', 70, 'https://www.example.com/game.jpg', 'Lyon', '2023-12-02', 3);


INSERT INTO category (`name`) 
VALUES 
('clothes'),
('transport'),
('other');

-- SELECT * FROM ad;
-- SELECT * FROM ad WHERE location = 'Bordeaux';
-- DELETE FROM ad WHERE price > 40;
-- UPDATE ad SET price = 0 WHERE createdAt = '2023-09-01';
-- SELECT AVG(price) AS average_price FROM ad WHERE location = 'Paris';
-- SELECT location, AVG(price) AS average_price FROM ad GROUP BY location ORDER BY average_price ASC;

SELECT ad.title, ad.description, ad.owner, ad.price, ad.picture, ad.location, ad.createdAt, cat.name AS category 
FROM ad 
LEFT JOIN category AS cat ON cat.id = ad.category_id 
WHERE LOWER(cat.name) = 'clothes';

SELECT ad.title, ad.description, ad.owner, ad.price, ad.picture, ad.location, ad.createdAt, cat.name AS category 
FROM ad 
LEFT JOIN category AS cat ON cat.id = ad.category_id 
WHERE cat.name IN ('clothes', 'transport');

SELECT cat.name AS category, AVG(ad.price) AS average_price 
FROM ad 
LEFT JOIN category AS cat ON cat.id = ad.category_id 
WHERE category = 'other';

SELECT ad.title, ad.description, ad.owner, ad.price, ad.picture, ad.location, ad.createdAt 
FROM ad 
LEFT JOIN category AS cat ON cat.id = ad.category_id 
WHERE cat.name LIKE 't%';

