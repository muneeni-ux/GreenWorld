import React, { useEffect, useState } from "react";
import { Package, PlusCircle, Trash2, Edit3, Loader2, Search } from "lucide-react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

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

const ITEMS_PER_PAGE = 10;

const Stock = () => {
  const [stock, setStock] = useState([]);
  const [filteredStock, setFilteredStock] = useState([]);
  const [newItem, setNewItem] = useState({ name: "", quantity: "", bv: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  // 🟢 Fetch Stock
  useEffect(() => {
    const fetchStock = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${SERVER_URL}/api/stock`);
        setStock(res.data);
        setFilteredStock(res.data);
      } catch {
        toast.error("❌ Failed to fetch stock data");
      } finally {
        setLoading(false);
      }
    };
    fetchStock();
  }, []);

  // 🔍 Search Filter
  useEffect(() => {
    const filtered = stock.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredStock(filtered);
    setPage(1);
  }, [searchTerm, stock]);

  // ✅ Add or Update Stock (merge quantities)
  const handleAddStock = async () => {
    if (!newItem.name || !newItem.quantity)
      return toast.error("⚠️ Please fill all fields!");

    try {
      const existing = stock.find(
        (item) => item.name.toLowerCase() === newItem.name.toLowerCase()
      );

      if (existing) {
        // Update quantity if exists
        const updatedItem = {
          ...existing,
          quantity: Number(existing.quantity) + Number(newItem.quantity),
        };
        const res = await axios.put(
          `${SERVER_URL}/api/stock/${existing._id}`,
          updatedItem
        );
        setStock(stock.map((s) => (s._id === existing._id ? res.data : s)));
        toast.success("🔄 Quantity updated successfully!");
      } else {
        // Add new item
        const res = await axios.post(`${SERVER_URL}/api/stock`, newItem);
        setStock([...stock, res.data]);
        toast.success("✅ Stock added successfully!");
      }

      setNewItem({ name: "", quantity: "", bv: "" });
    } catch {
      toast.error("❌ Error adding stock!");
    }
  };

  // ✅ Delete Stock
  const handleDelete = async (id) => {
    if (window.confirm("Delete this product?")) {
      try {
        await axios.delete(`${SERVER_URL}/api/stock/${id}`);
        setStock(stock.filter((item) => item._id !== id));
        toast.success("🗑️ Product deleted!");
      } catch {
        toast.error("❌ Error deleting stock!");
      }
    }
  };

  // ✅ Edit Stock
  const handleEdit = (item) => {
    setIsEditing(true);
    setEditItem(item);
  };

  const handleUpdate = async () => {
    if (!editItem.name || !editItem.quantity)
      return toast.error("⚠️ All fields required!");
    try {
      const res = await axios.put(`${SERVER_URL}/api/stock/${editItem._id}`, editItem);
      setStock(stock.map((s) => (s._id === editItem._id ? res.data : s)));
      setIsEditing(false);
      setEditItem(null);
      toast.success("✏️ Stock updated successfully!");
    } catch {
      toast.error("❌ Error updating stock!");
    }
  };

  // 🧮 Auto fill BV
  const handleProductSelect = (e) => {
    const selected = productBVList.find((p) => p.name === e.target.value);
    const bvValue = selected ? selected.bv : "";
    if (isEditing) {
      setEditItem({ ...editItem, name: e.target.value, bv: bvValue });
    } else {
      setNewItem({ ...newItem, name: e.target.value, bv: bvValue });
    }
  };

  // 📑 Pagination
  const totalPages = Math.ceil(filteredStock.length / ITEMS_PER_PAGE);
  const currentPageItems = filteredStock.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <div className="pt-24 px-6 md:px-12 min-h-screen bg-gradient-to-br from-green-50 to-white">
      <Toaster position="top-right" reverseOrder={false} />

      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-3xl font-bold text-green-800 flex items-center gap-2">
          <Package size={30} className="text-green-700" /> Stock Management
        </h1>
      </div>

      {/* Add/Edit Stock Form */}
      <div className="bg-white shadow-md rounded-2xl p-6 mb-10 max-w-3xl mx-auto border border-green-100">
        <h2 className="text-xl font-semibold text-green-700 mb-4 flex items-center gap-2">
          <PlusCircle size={20} className="text-green-600" />
          {isEditing ? "Update Stock Item" : "Add New Stock"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <select
            value={isEditing ? editItem?.name : newItem.name}
            onChange={handleProductSelect}
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
            value={isEditing ? editItem?.quantity : newItem.quantity}
            onChange={(e) =>
              isEditing
                ? setEditItem({ ...editItem, quantity: e.target.value })
                : setNewItem({ ...newItem, quantity: e.target.value })
            }
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
          />

          <input
            type="text"
            placeholder="BV"
            value={isEditing ? editItem?.bv : newItem.bv}
            readOnly
            className="border border-gray-300 rounded-lg px-4 py-2 bg-gray-50 text-gray-600"
          />

          {isEditing ? (
            <button
              onClick={handleUpdate}
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg py-2"
            >
              Update
            </button>
          ) : (
            <button
              onClick={handleAddStock}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg py-2"
            >
              Add Stock
            </button>
          )}
        </div>
      </div>

      {/* 🔍 Search Bar */}
      <div className="max-w-md mx-auto mb-6 flex items-center border border-gray-300 rounded-lg px-4 py-2 bg-white">
        <Search className="text-green-600 mr-2" size={20} />
        <input
          type="text"
          placeholder="Search product..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full outline-none"
        />
      </div>

      {/* Stock Table */}
      <div className="bg-white shadow-md rounded-2xl p-6 border border-green-100">
        <h2 className="text-xl font-semibold text-green-700 mb-6">Current Stock</h2>

        {loading ? (
          <div className="flex justify-center py-10">
            <Loader2 size={28} className="animate-spin text-green-600" />
          </div>
        ) : currentPageItems.length === 0 ? (
          <p className="text-gray-500 text-center py-6">No stock available.</p>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-green-100 text-green-800 text-left">
                    <th className="py-3 px-4">Product Name</th>
                    <th className="py-3 px-4">Quantity</th>
                    <th className="py-3 px-4">BV</th>
                    <th className="py-3 px-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentPageItems.map((item) => (
                    <tr key={item._id} className="border-b hover:bg-green-50">
                      <td className="py-3 px-4">{item.name}</td>
                      <td className="py-3 px-4">{item.quantity}</td>
                      <td className="py-3 px-4">{item.bv}</td>
                      <td className="py-3 px-4 flex justify-center gap-3">
                        <button
                          onClick={() => handleEdit(item)}
                          className="text-yellow-500 hover:text-yellow-600"
                        >
                          <Edit3 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
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

            {/* Pagination Controls */}
            <div className="flex justify-center mt-6 gap-3">
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="px-4 py-2 bg-green-100 hover:bg-green-200 rounded-lg text-green-700 disabled:opacity-40"
              >
                Prev
              </button>
              <span className="px-3 py-2 text-green-800 font-semibold">
                Page {page} of {totalPages}
              </span>
              <button
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
                className="px-4 py-2 bg-green-100 hover:bg-green-200 rounded-lg text-green-700 disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Stock;
