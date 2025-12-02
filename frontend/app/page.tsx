"use client";

import React, { useState } from "react";
import Image from "next/image";
import Header from "./components/Header";
import Footer from "./components/Footer";

type Product = {
  name: string;
  description: string;
  price: number;
  quantity: number;
  pictureURL: string;
};

const PRODUCTS: Product[] = [
  {
    name: "Brake Pads",
    description: "All-weather brake pad set for optimal performance.",
    price: 39.99,
    quantity: 10,
    pictureURL: "https://m.media-amazon.com/images/I/61h07ruAEWL._AC_UF894,1000_QL80_.jpg",
  },
  {
    name: "Air Filter",
    description: "High-performance air filter for cleaner air intake.",
    price: 24.5,
    quantity: 15,
    pictureURL: "https://via.placeholder.com/300x200?text=Air+Filter",
  },
  {
    name: "Oil Filter",
    description: "Premium oil filter for extended engine life.",
    price: 14.99,
    quantity: 20,
    pictureURL: "https://via.placeholder.com/300x200?text=Oil+Filter",
  },
];

export default function Home() {
  const [cart, setCart] = useState<Record<string, number>>({});

  function addToCart(name: string) {
    setCart(prev => ({ ...prev, [name]: (prev[name] || 0) + 1 }));
  }

  function removeFromCart(name: string) {
    setCart(prev => {
      const current = prev[name] || 0;
      if (current <= 1) {
        const { [name]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [name]: current - 1 };
    });
  }

  const totalItems = Object.values(cart).reduce((s, n) => s + n, 0);
  const totalPrice = PRODUCTS.reduce((sum, p) => sum + (cart[p.name] || 0) * p.price, 0);

  return (
    <>
      <Header />
      <main className="p-8 bg-slate-50 min-h-screen">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Product Catalog</h1>
          <div className="bg-white p-3 rounded shadow text-right">
            <div className="text-sm text-gray-500">Cart</div>
            <div className="font-semibold">{totalItems} item{totalItems !== 1 ? 's' : ''}</div>
            <div className="text-sm text-gray-700">${totalPrice.toFixed(2)}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {PRODUCTS.map((product) => (
            <div
              key={product.name}
              className="border rounded-lg p-4 bg-white shadow"
            >
              <img
                src={product.pictureURL}
                alt={product.name}
                className="w-full h-40 object-contain mb-3 rounded"
              />
              <h2 className="font-semibold text-lg">{product.name}</h2>
              <p className="text-sm text-gray-500">{product.description}</p>
              <p className="font-bold text-xl mt-1">${product.price.toFixed(2)}</p>
              <p className="text-sm text-gray-500">Available: {product.quantity}</p>

              <div className="mt-4 flex items-center gap-3">
                <button
                  onClick={() => removeFromCart(product.name)}
                  disabled={!cart[product.name]}
                  className="px-3 py-1 rounded bg-red-500 text-white disabled:opacity-50"
                >
                  Remove
                </button>

                <div className="min-w-[2rem] text-center">{cart[product.name] || 0}</div>

                <button
                  onClick={() => addToCart(product.name)}
                  className="px-3 py-1 rounded bg-green-600 text-white"
                >
                  Add
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}