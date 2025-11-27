import AdminHeader from "../components/AdminHeader";
import Footer from "../components/Footer";

const WarehousePage = () => {
  return (
    <>
      <AdminHeader />
      <main className="p-8 bg-slate-50 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">Warehouse Interface</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="border rounded-lg p-4 bg-white shadow">
            <h2 className="font-semibold text-lg">Packing List</h2>
            <p>Print packing lists for completed orders.</p>
            <button className="mt-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
              Print Packing List
            </button>
          </div>
          <div className="border rounded-lg p-4 bg-white shadow">
            <h2 className="font-semibold text-lg">Update Inventory</h2>
            <p>Add delivered products to inventory.</p>
            <button className="mt-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
              Update Inventory
            </button>
          </div>
          <div className="border rounded-lg p-4 bg-white shadow">
            <h2 className="font-semibold text-lg">Shipping Labels</h2>
            <p>Print shipping labels for orders.</p>
            <button className="mt-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
              Print Shipping Labels
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default WarehousePage;