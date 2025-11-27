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
    price: 24.50,
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
  return (
    <>
      <Header />
      <main className="p-8 bg-slate-50 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">Product Catalog</h1>

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
              <p className="font-bold text-xl mt-1">
                ${product.price.toFixed(2)}
              </p>
              <p className="text-sm text-gray-500">
                Available: {product.quantity}
              </p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
  
}