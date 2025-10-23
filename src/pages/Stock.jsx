import React, { useState } from "react";
import { Package, PlusCircle, Trash2, Edit3 } from "lucide-react";

const Stock = () => {
  // Mock data for now (local only)
  const [stock, setStock] = useState([
    { id: 1, name: "Immune Booster", quantity: 50, bv: 10 },
    { id: 2, name: "Blood Circulation Capsule", quantity: 80, bv: 8 },
    { id: 3, name: "Calcium Tablet", quantity: 120, bv: 5 },
  ]);

  const [newItem, setNewItem] = useState({ name: "", quantity: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editItem, setEditItem] = useState(null);

  // ✅ Add Stock
  const handleAddStock = () => {
    if (!newItem.name || !newItem.quantity) return alert("Please fill all fields");
    const newStock = {
      id: Date.now(),
      name: newItem.name,
      quantity: parseInt(newItem.quantity),
      bv: Math.floor(Math.random() * 10) + 5, // random bv for mock
    };
    setStock([...stock, newStock]);
    setNewItem({ name: "", quantity: "" });
  };

  // ✅ Delete Stock
  const handleDelete = (id) => {
    if (window.confirm("Delete this product?")) {
      setStock(stock.filter((item) => item.id !== id));
    }
  };

  // ✅ Edit Stock
  const handleEdit = (item) => {
    setIsEditing(true);
    setEditItem(item);
  };

  const handleUpdate = () => {
    if (!editItem.name || !editItem.quantity) return alert("All fields required!");
    setStock(
      stock.map((s) =>
        s.id === editItem.id ? { ...editItem, quantity: parseInt(editItem.quantity) } : s
      )
    );
    setIsEditing(false);
    setEditItem(null);
  };

  return (
    <div className="pt-24 px-6 md:px-12 min-h-screen bg-gradient-to-br from-green-50 to-white">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-3xl font-bold text-green-800 flex items-center gap-2">
          <Package size={30} className="text-green-700" /> Stock Management
        </h1>
      </div>

      {/* Add / Edit Stock Form */}
      <div className="bg-white shadow-md rounded-2xl p-6 mb-10 max-w-3xl mx-auto border border-green-100">
        <h2 className="text-xl font-semibold text-green-700 mb-4 flex items-center gap-2">
          <PlusCircle size={20} className="text-green-600" />
          {isEditing ? "Update Stock Item" : "Add New Stock"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Product Name"
            value={isEditing ? editItem?.name : newItem.name}
            onChange={(e) =>
              isEditing
                ? setEditItem({ ...editItem, name: e.target.value })
                : setNewItem({ ...newItem, name: e.target.value })
            }
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="number"
            placeholder="Quantity"
            value={isEditing ? editItem?.quantity : newItem.quantity}
            onChange={(e) =>
              isEditing
                ? setEditItem({ ...editItem, quantity: e.target.value })
                : setNewItem({ ...newItem, quantity: e.target.value })
            }
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          {isEditing ? (
            <button
              onClick={handleUpdate}
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg py-2 transition-all duration-200"
            >
              Update
            </button>
          ) : (
            <button
              onClick={handleAddStock}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg py-2 transition-all duration-200"
            >
              Add Stock
            </button>
          )}
        </div>
      </div>

      {/* Stock List */}
      <div className="bg-white shadow-md rounded-2xl p-6 border border-green-100">
        <h2 className="text-xl font-semibold text-green-700 mb-6">
          Current Stock
        </h2>

        {stock.length === 0 ? (
          <p className="text-gray-500 text-center py-6">No stock available.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-green-100 text-green-800 text-left">
                  <th className="py-3 px-4 rounded-tl-lg">Product Name</th>
                  <th className="py-3 px-4">Quantity</th>
                  <th className="py-3 px-4">BV (Bonus Value)</th>
                  <th className="py-3 px-4 rounded-tr-lg text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {stock.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b hover:bg-green-50 transition-all duration-200"
                  >
                    <td className="py-3 px-4">{item.name}</td>
                    <td className="py-3 px-4">{item.quantity}</td>
                    <td className="py-3 px-4">{item.bv}</td>
                    <td className="py-3 px-4 text-center flex justify-center gap-3">
                      <button
                        onClick={() => handleEdit(item)}
                        className="text-yellow-500 hover:text-yellow-600 transition-all"
                      >
                        <Edit3 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-red-500 hover:text-red-600 transition-all"
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
      </div>
    </div>
  );
};

export default Stock;
