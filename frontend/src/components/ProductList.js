import React from 'react';
import { useCart } from './CartContext';
import styles from './ProductList.module.css'; // Import the CSS module

// Importing the images
import image1 from './images/1.PNG';
import image2 from './images/2.PNG';
import image3 from './images/3.PNG';
import image4 from './images/4.PNG';
import image5 from './images/5.PNG';
import image6 from './images/6.PNG';
import image7 from './images/7.PNG';
import image8 from './images/8.PNG';
import image9 from './images/9.PNG';
import image10 from './images/10.PNG';
import image11 from './images/11.PNG';
import image12 from './images/12.PNG';

const products = [
    {
        id: 1,
        name: 'Coffee 1',
        image: image1,  // Using the imported image
        price: 75
    },
    {
        id: 2,
        name: 'Coffee 2',
        image: image2,
        price: 85
    },
    {
        id: 3,
        name: 'Coffee 3',
        image: image3,
        price: 140
    },
    {
        id: 4,
        name: 'Coffee 4',
        image: image4,
        price: 80
    },
    {
        id: 5,
        name: 'Coffee 5',
        image: image5,
        price: 130
    },
    {
        id: 6,
        name: 'Coffee 6',
        image: image6,
        price: 120
    },
    {
        id: 7,
        name: 'Ramen',
        image: image7,  // Using the imported image
        price: 150
    },
    {
        id: 8,
        name: 'Beef Ramen',
        image: image8,
        price: 120
    },
    {
        id: 9,
        name: 'Rainbow Salad',
        image: image9,
        price: 220
    },
    {
        id: 10,
        name: 'Pizza',
        image: image10,
        price: 123
    },
    {
        id: 11,
        name: 'Spaghetti',
        image: image11,
        price: 320
    },
    {
        id: 12,
        name: 'Berry Trifle',
        image: image12,
        price: 300
    }
];

const ProductList = () => {
    const { addItem } = useCart();

    return (
        <div className={styles.list}>
            {products.map(product => (
                <div key={product.id} className={styles.item}>
                    <img src={product.image} alt={product.name} />
                    <div className={styles.title}>{product.name}</div>
                    <div className={styles.price}>₱{product.price.toLocaleString()}</div>
                    <button onClick={() => addItem(product)}>Add To Cart</button>
                </div>
            ))}
        </div>
    );
};

export default ProductList;
