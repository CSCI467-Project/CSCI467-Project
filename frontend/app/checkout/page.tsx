"use client";

import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useCart } from "../components/CartProvider";
import { PRODUCTS } from "../data/products";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    creditCard: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const totalItems = Object.values(cart).reduce((s, n) => s + n, 0);
  const totalPrice = PRODUCTS.reduce((sum, p) => sum + (cart[p.name] || 0) * p.price, 0);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { id, value } = e.target as HTMLInputElement;
    setForm((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => ({ ...prev, [id]: "" }));
  }

  function validate() {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Name is required.";
    if (!form.email.trim()) errs.email = "Email is required.";
    else if (!form.email.includes("@") || !form.email.includes(".com"))
      errs.email = "Email must include '@' and '.com'.";
    if (!form.address.trim()) errs.address = "Address is required.";
    if (!form.city.trim()) errs.city = "City is required.";
    if (!form.state.trim()) errs.state = "State is required.";
    if (!form.zip.trim()) errs.zip = "ZIP / Postal code is required.";
    // basic credit card presence check
    if (!form.creditCard.trim()) errs.creditCard = "Credit card is required.";
    return errs;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length === 0) {
      // success
      setSubmitted(true);
      clearCart();
    }
  }

  const isFormComplete =
    form.name && form.email && form.address && form.city && form.state && form.zip && form.creditCard;
  const emailValid = form.email.includes("@") && form.email.includes(".com");
  const canSubmit = Boolean(isFormComplete && emailValid && totalItems > 0);

  return (
    <>
      <Header />
      <main className="p-8 bg-slate-50 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>

        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
            {submitted ? (
              <div className="p-4 bg-green-50 text-green-800 rounded mb-4">Order submitted successfully!</div>
            ) : null}

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                value={form.name}
                onChange={handleChange}
                className="w-full border rounded p-2"
                placeholder="Enter your name"
              />
              {errors.name && <div className="text-red-600 text-sm mt-1">{errors.name}</div>}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                value={form.email}
                onChange={handleChange}
                className="w-full border rounded p-2"
                placeholder="Enter your email"
              />
              {errors.email && <div className="text-red-600 text-sm mt-1">{errors.email}</div>}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1" htmlFor="address">
                Address Line
              </label>
              <input
                id="address"
                value={form.address}
                onChange={handleChange}
                className="w-full border rounded p-2"
                placeholder="Street address, P.O. box, company, c/o"
              />
              {errors.address && <div className="text-red-600 text-sm mt-1">{errors.address}</div>}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1" htmlFor="city">
                City
              </label>
              <input
                id="city"
                value={form.city}
                onChange={handleChange}
                className="w-full border rounded p-2"
                placeholder="City"
              />
              {errors.city && <div className="text-red-600 text-sm mt-1">{errors.city}</div>}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1" htmlFor="state">
                State / Province
              </label>
              <input
                id="state"
                value={form.state}
                onChange={handleChange}
                className="w-full border rounded p-2"
                placeholder="State or province"
              />
              {errors.state && <div className="text-red-600 text-sm mt-1">{errors.state}</div>}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1" htmlFor="zip">
                ZIP / Postal Code
              </label>
              <input
                id="zip"
                value={form.zip}
                onChange={handleChange}
                className="w-full border rounded p-2"
                placeholder="ZIP or postal code"
              />
              {errors.zip && <div className="text-red-600 text-sm mt-1">{errors.zip}</div>}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1" htmlFor="country">
                Country
              </label>
              <input
                id="country"
                value={form.country}
                onChange={handleChange}
                className="w-full border rounded p-2"
                placeholder="Country"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1" htmlFor="creditCard">
                Credit Card Information
              </label>
              <input
                id="creditCard"
                value={form.creditCard}
                onChange={handleChange}
                className="w-full border rounded p-2"
                placeholder="Card number"
              />
              {errors.creditCard && <div className="text-red-600 text-sm mt-1">{errors.creditCard}</div>}
            </div>

            <button
              type="submit"
              disabled={!canSubmit}
              className={`w-full py-2 rounded text-white ${canSubmit ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400 cursor-not-allowed'}`}
            >
              Submit Order
            </button>

            {!totalItems && <div className="text-sm text-gray-500 mt-2">Your cart is empty — add items before checking out.</div>}
          </form>

          <aside className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="text-sm text-gray-600 mb-2">Items: {totalItems}</div>
            <div className="font-bold text-lg">Total: ${totalPrice.toFixed(2)}</div>
            <ul className="mt-4 space-y-2">
              {PRODUCTS.filter(p => cart[p.name]).map(p => (
                <li key={p.name} className="flex justify-between">
                  <span>{p.name} x {cart[p.name]}</span>
                  <span>${((cart[p.name] || 0) * p.price).toFixed(2)}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}