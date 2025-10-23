import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
  ShoppingBag,
  User,
  PlusCircle,
  Trash2,
  Calculator,
  Loader2,
  Search,
} from "lucide-react";

const SERVER_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:5000";

// 🧾 Product BV List
const productBVList = [
  { name: "Cordyceps Plus Capsule", bv: 22.5 },
  { name: "Cardio Power Capsule", bv: 26 },
  { name: "Soy Power Capsule", bv: 29 },
  { name: "VigPower Capsule", bv: 29 },
  { name: "Ginseng RHs Capsule", bv: 39 },
  { name: "Kuding Plus Tea", bv: 14 },
  { name: "Ganoderma Coffee", bv: 16 },
  { name: "Lipki Care Tea", bv: 12 },
  { name: "Protein Powder", bv: 39 },
  { name: "Multivitamin Tablet (Adults)", bv: 26 },
  { name: "Calcium Tablet (Adults)", bv: 29 },
  { name: "Zinc Tablet (Adults)", bv: 19 },
  { name: "Lecithin Softgel", bv: 25 },
  { name: "Deep Sea Fish Oil Softgel", bv: 20 },
  { name: "Meal Cellulose Tablet", bv: 22 },
  { name: "Garlic Oil Capsule", bv: 22 },
  { name: "Eye Care Softgel", bv: 28 },
  { name: "Chitosan Capsule", bv: 22 },
  { name: "Aloe Vera Plus Capsule", bv: 22 },
  { name: "Compound Marrow Powder", bv: 27 },
  { name: "Ginkgo Biloba Capsule", bv: 25 },
  { name: "Pine Pollen Tea", bv: 13 },
  { name: "Intestine Cleansing Tea", bv: 13 },
  { name: "Balsam Pear Tea", bv: 13 },
  { name: "B-Carotene & Lycopene Capsule", bv: 22 },
  { name: "Livergen Capsule", bv: 28 },
  { name: "Royal Jelly Softgel", bv: 20 },
  { name: "Ishine Capsule", bv: 24 },
  { name: "Parashield Capsule", bv: 18 },
  { name: "Magic Detoxin Pad", bv: 22 },
  { name: "Slimming Capsule", bv: 25 },
  { name: "Joint Health Plus Capsule", bv: 25 },
  { name: "Super Co-Q10 Capsule", bv: 30 },
  { name: "Vitamin C Tablet", bv: 12 },
  { name: "Vitamin E Capsule", bv: 24 },
  { name: "Super Nutrition Powder", bv: 45 },
  { name: "Glucoblock Capsule", bv: 19 },
  { name: "ProstaSure Capsule", bv: 35 },
  { name: "Kidney Tonifying Capsule (Men)", bv: 30 },
  { name: "Kidney Tonifying Capsule (Women)", bv: 30 },
  { name: "Blueberry Juice High VC", bv: 21 },
  { name: "Nutriplant Organic Fertilizer (1L)", bv: 30 },
  { name: "Toothpaste", bv: 15 },
  { name: "Fresh Drink Clear", bv: 10 },
  { name: "Olive Soap", bv: 32 },
  { name: "Breast Care Tea", bv: 18 },
  { name: "Uterus Cleansing Pill", bv: 32 },
  { name: "Jinpure Tea", bv: 14 },
  { name: "IMM Longevity Capsule", bv: 47 },
  { name: "Golden Knight Spray", bv: 15 },
  { name: "Silver Eva Spray", bv: 13 },
  { name: "Calcium Powder (Children)", bv: 20 },
  { name: "Calcium Powder (Adult)", bv: 22 },
  { name: "Bone Care Plaster", bv: 20 },
  { name: "Women Care Gel", bv: 18 },
];

const Sales = () => {
  const [sales, setSales] = useState([]);
  const [distributors, setDistributors] = useState([]);
  const [newSale, setNewSale] = useState({
    distributorId: "",
    product: "",
    quantity: "",
  });
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  // 🧠 Fetch data
  useEffect(() => {
    fetchSales();
    fetchDistributors();
  }, []);

  const fetchSales = async () => {
    try {
      const res = await axios.get(`${SERVER_URL}/api/sales`);
      setSales(res.data);
    } catch (err) {
      toast.error("Failed to load sales data");
    }
  };

  const fetchDistributors = async () => {
    try {
      const res = await axios.get(`${SERVER_URL}/api/distributors`);
      setDistributors(res.data);
    } catch (err) {
      toast.error("Failed to fetch distributors");
    }
  };

  // 🔢 Get BV for selected product
  const getBV = (productName) => {
    const product = productBVList.find((p) => p.name === productName);
    return product ? product.bv : 0;
  };

  // ➕ Add sale
  const handleAddSale = async () => {
    if (!newSale.distributorId || !newSale.product || !newSale.quantity) {
      return toast.error("Please fill all fields.");
    }

    const bv = getBV(newSale.product);
    const payload = {
      distributorId: newSale.distributorId,
      product: newSale.product,
      quantity: Number(newSale.quantity),
      bv,
    };

    setLoading(true);
    try {
      await axios.post(`${SERVER_URL}/api/sales`, payload);
      toast.success("Sale recorded successfully!");
      setNewSale({ distributorId: "", product: "", quantity: "" });
      fetchSales();
    } catch (err) {
      toast.error("Failed to record sale");
    } finally {
      setLoading(false);
    }
  };

  // 🗑️ Delete sale
  const handleDelete = async (id) => {
    if (window.confirm("Delete this sale?")) {
      try {
        await axios.delete(`${SERVER_URL}/api/sales/${id}`);
        toast.success("Sale deleted!");
        fetchSales();
      } catch (err) {
        toast.error("Failed to delete sale");
      }
    }
  };

  // 🔍 Filter sales
  const filteredSales = sales.filter(
    (sale) =>
      sale.distributor?.name
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      sale.product.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentSales = filteredSales.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(filteredSales.length / recordsPerPage);

  const totalBVSum = filteredSales.reduce(
    (acc, sale) => acc + (sale.totalBV || 0),
    0
  );

  return (
    <div className="pt-24 px-6 md:px-12 min-h-screen bg-gradient-to-br from-green-50 to-white">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-3xl font-bold text-green-800 flex items-center gap-2">
          <ShoppingBag size={30} className="text-green-700" /> Sales Management
        </h1>
      </div>

      {/* Add Sale Form */}
      <div className="bg-white shadow-md rounded-2xl p-6 mb-10 max-w-4xl mx-auto border border-green-100">
        <h2 className="text-xl font-semibold text-green-700 mb-4 flex items-center gap-2">
          <PlusCircle size={20} className="text-green-600" /> Record New Sale
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <select
            value={newSale.distributorId}
            onChange={(e) =>
              setNewSale({ ...newSale, distributorId: e.target.value })
            }
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
          >
            <option value="">Select Distributor</option>
            {distributors.map((d) => (
              <option key={d._id} value={d._id}>
                {d.name}
              </option>
            ))}
          </select>

          <select
            value={newSale.product}
            onChange={(e) => setNewSale({ ...newSale, product: e.target.value })}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
          >
            <option value="">Select Product</option>
            {productBVList.map((p, i) => (
              <option key={i} value={p.name}>
                {p.name}
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Quantity"
            value={newSale.quantity}
            onChange={(e) =>
              setNewSale({ ...newSale, quantity: e.target.value })
            }
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
          />

          <button
            onClick={handleAddSale}
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg py-2 flex items-center justify-center"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : "Add Sale"}
          </button>
        </div>

        {newSale.product && newSale.quantity && (
          <div className="mt-4 flex items-center gap-2 text-green-700">
            <Calculator size={18} />
            <p>
              Estimated BV:{" "}
              <span className="font-bold">
                {getBV(newSale.product) * parseInt(newSale.quantity)} BV
              </span>
            </p>
          </div>
        )}
      </div>

      {/* Search */}
      <div className="mb-6 max-w-lg mx-auto flex items-center border border-green-300 rounded-lg px-4 py-2">
        <Search size={18} className="text-green-700" />
        <input
          type="text"
          placeholder="Search by distributor or product..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="ml-2 w-full outline-none text-gray-700"
        />
      </div>

      {/* Sales Table */}
      <div className="bg-white shadow-md rounded-2xl p-6 border border-green-100">
        <h2 className="text-xl font-semibold text-green-700 mb-6 flex items-center gap-2">
          <User size={20} className="text-green-600" /> Distributor Sales Records
        </h2>

        {currentSales.length === 0 ? (
          <p className="text-gray-500 text-center py-6">No matching records.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-green-100 text-green-800 text-left">
                  <th className="py-3 px-4 rounded-tl-lg">Distributor</th>
                  <th className="py-3 px-4">Product</th>
                  <th className="py-3 px-4">Quantity</th>
                  <th className="py-3 px-4">Total BV</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4 rounded-tr-lg text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentSales.map((sale) => (
                  <tr
                    key={sale._id}
                    className="border-b hover:bg-green-50 transition-all"
                  >
                    <td className="py-3 px-4">{sale.distributor?.name || "N/A"}</td>
                    <td className="py-3 px-4">{sale.product}</td>
                    <td className="py-3 px-4">{sale.quantity}</td>
                    <td className="py-3 px-4 font-semibold text-green-700">
                      {sale.totalBV}
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {new Date(sale.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => handleDelete(sale._id)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 mt-6">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="px-3 py-1 bg-green-100 hover:bg-green-200 text-green-800 rounded-lg disabled:opacity-40"
            >
              Prev
            </button>
            <p className="text-green-700 font-medium">
              Page {currentPage} of {totalPages}
            </p>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="px-3 py-1 bg-green-100 hover:bg-green-200 text-green-800 rounded-lg disabled:opacity-40"
            >
              Next
            </button>
          </div>
        )}

        {/* Total BV */}
        {sales.length > 0 && (
          <div className="mt-6 text-right">
            <p className="text-green-800 font-semibold text-lg">
              Total BV Awarded:{" "}
              <span className="text-green-700">{totalBVSum}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sales;
