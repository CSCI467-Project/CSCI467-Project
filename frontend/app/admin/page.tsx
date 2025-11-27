import AdminHeader from "../components/AdminHeader";
import Footer from "../components/Footer";

const AdminPage = () => {
  return (
    <>
      <AdminHeader />
      <main className="p-8 bg-slate-50 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">Administrative Interface</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="border rounded-lg p-4 bg-white shadow">
            <h2 className="font-semibold text-lg">Shipping Charges</h2>
            <p>Set weight brackets and their charges.</p>
            <button className="mt-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
              Set Charges
            </button>
          </div>
          <div className="border rounded-lg p-4 bg-white shadow">
            <h2 className="font-semibold text-lg">View Orders</h2>
            <p>Search orders by date range, status, or price range.</p>
            <button className="mt-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
              Search Orders
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default AdminPage;