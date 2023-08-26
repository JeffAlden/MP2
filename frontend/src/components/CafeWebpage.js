// eslint-disable-next-line
import React from 'react';
import './CafeWebpage.css';
import coffeeShopImage from '../components/assets/shop.jpg';
import ProductList from './ProductList';

const CafeWebpage = () => {

    return (
        <div className="cafe-webpage">
            <section className="section introduction">
                <h2 className="centered-title">Welcome to CodeBrew Coffee Shop!</h2>
                <p className="intro-text">We are a premier coffee shop dedicated to providing you with the finest coffee experience, where every sip matters. We understand the joy and comfort a cup of coffee can bring, especially in these trying times. Our passion is evident in every cup we serve, carefully crafted to brighten your day. We take immense pride in our craft and are committed to excellence. Our goal is simple yet profound: to provide you with an unparalleled coffee experience. Thank you for letting us be a part of your daily routine.</p>
                <img src={coffeeShopImage} className="img-fluid" alt="Coffee shop interior" />
            </section>

            <section className="section about">
                <h2 className="centered-title">About Us</h2>
                <p>At CodeBrew Coffee Shop, we understand the universal appeal of a perfectly brewed cup of coffee. Our journey began with the collective desire to cater to the diverse coffee preferences of our community. As we've grown, so has our community of coffee lovers, and today we stand united in our mission to serve every individual's unique coffee needs.</p>
            </section>

            <section className="section services">
                <h2 className="centered-title">Our Services</h2>
                <ul className="centered-list">
                    <p>At CodeBrew Coffee Shop, we take pride in offering a diverse menu to cater to the tastes of our esteemed customers. From invigorating coffee blends to warm, savory ramen, every dish is crafted with love. Our menu also features fresh salads, mouth-watering pizzas, classic spaghetti, and a delectable berry trifle to satiate your sweet cravings.</p>
                    <p>Beyond our extensive menu, we provide an ambiance that guarantees a cozy and relaxing experience. Our staff, both friendly and knowledgeable, is always ready to assist, ensuring you enjoy every moment spent at our coffee shop while indulging in delicious pastries and snacks.</p>
                </ul>
            </section>

            <section className="section products">
                <h2 className="centered-title">Our Products</h2>
                <p>Explore our diverse range of coffee blends, each carefully sourced and roasted to perfection. In addition to our exquisite coffees, our menu features customer favorites such as ramen, salad, pizza, and classic spaghetti. And for those with a sweet tooth, don't miss out on our delightful berry trifle.</p>
                <ProductList />
            </section>

            <section className="section contact">
                <h2 className="centered-title">Contact Us</h2>
                <p>If you have any questions or would like to get in touch, feel free to reach out to us:</p>
                <address>
                    <p>Email: info@codebrewcoffeeshop.com</p>
                    <p>Phone: (123) 456-7890</p>
                    <p>Address: 123 Coffee Street, Cityville</p>
                </address>
            </section>
        </div>
    );
};

export default CafeWebpage;
