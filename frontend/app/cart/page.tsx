"use client";

import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCart } from '../components/CartProvider';
import { PRODUCTS } from '../data/products';

const CartPage = () => {
  const { cart, addToCart, removeFromCart } = useCart();

  const items = PRODUCTS.filter(p => cart[p.name]);
  const totalItems = Object.values(cart).reduce((s, n) => s + n, 0);
  const totalPrice = PRODUCTS.reduce((sum, p) => sum + (cart[p.name] || 0) * p.price, 0);

  return (
    <>
      <Header />
      <main style={{ padding: '2rem' }}>
        <h1>Your Cart</h1>

        {items.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div style={{ marginTop: '1rem' }}>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {items.map((p) => (
                <li key={p.name} style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem' }}>
                  <img src={p.pictureURL} alt={p.name} style={{ width: 100, height: 70, objectFit: 'contain' }} />
                  <div style={{ flex: 1 }}>
                    <strong>{p.name}</strong>
                    <div style={{ fontSize: '0.9rem', color: '#555' }}>{p.description}</div>
                    <div style={{ fontSize: '0.9rem', color: '#333' }}>${p.price.toFixed(2)} each</div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <button onClick={() => removeFromCart(p.name)} style={{ padding: '0.4rem 0.6rem' }}>-</button>
                    <div style={{ minWidth: '2rem', textAlign: 'center' }}>{cart[p.name] || 0}</div>
                    <button onClick={() => addToCart(p.name)} style={{ padding: '0.4rem 0.6rem' }}>+</button>
                  </div>

                  <div style={{ width: 120, textAlign: 'right' }}>${((cart[p.name] || 0) * p.price).toFixed(2)}</div>
                </li>
              ))}
            </ul>

            <div style={{ marginTop: '1rem' }}>
              <strong>Items:</strong> {totalItems}
              <br />
              <strong>Total:</strong> ${totalPrice.toFixed(2)}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
};

export default CartPage;