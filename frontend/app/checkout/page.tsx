import Header from "../components/Header";
import Footer from "../components/Footer";

const CheckoutPage = () => {
  return (
    <>
      <Header />
      <main className="p-8 bg-slate-50 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>
        <form className="max-w-lg mx-auto bg-white p-6 rounded shadow">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full border rounded p-2"
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full border rounded p-2"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="address">
              Mailing Address
            </label>
            <textarea
              id="address"
              className="w-full border rounded p-2"
              placeholder="Enter your mailing address"
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="credit-card">
              Credit Card Information
            </label>
            <input
              type="text"
              id="credit-card"
              className="w-full border rounded p-2"
              placeholder="Enter your credit card number"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Submit Order
          </button>
        </form>
      </main>
      <Footer />
    </>
  );
};

export default CheckoutPage;