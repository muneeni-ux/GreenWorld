import React, { useState } from "react";
import { ShoppingBag, User, PlusCircle, Trash2, Calculator } from "lucide-react";

const Sales = () => {
  // Mock product data (in real system this will come from the stock)
  const products = [
    { id: 1, name: "Immune Booster", bv: 10 },
    { id: 2, name: "Blood Circulation Capsule", bv: 8 },
    { id: 3, name: "Calcium Tablet", bv: 5 },
  ];

  const [sales, setSales] = useState([
    {
      id: 1,
      distributor: "Jane Mwikali",
      product: "Immune Booster",
      quantity: 3,
      totalBV: 30,
      date: "2025-10-22",
    },
  ]);

  const [newSale, setNewSale] = useState({
    distributor: "",
    product: "",
    quantity: "",
  });

  // Calculate total BV
  const calculateBV = (productName, qty) => {
    const product = products.find((p) => p.name === productName);
    return product ? product.bv * qty : 0;
  };

  // Add new sale
  const handleAddSale = () => {
    if (!newSale.distributor || !newSale.product || !newSale.quantity)
      return alert("Please fill all fields.");

    const totalBV = calculateBV(newSale.product, parseInt(newSale.quantity));
    const newRecord = {
      id: Date.now(),
      distributor: newSale.distributor,
      product: newSale.product,
      quantity: parseInt(newSale.quantity),
      totalBV,
      date: new Date().toISOString().split("T")[0],
    };

    setSales([...sales, newRecord]);
    setNewSale({ distributor: "", product: "", quantity: "" });
  };

  // Delete sale
  const handleDelete = (id) => {
    if (window.confirm("Delete this sale record?")) {
      setSales(sales.filter((s) => s.id !== id));
    }
  };

  // Calculate total BV for summary
  const totalBVSum = sales.reduce((acc, sale) => acc + sale.totalBV, 0);

  return (
    <div className="pt-24 px-6 md:px-12 min-h-screen bg-gradient-to-br from-green-50 to-white">
      {/* Header */}
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
          {/* Distributor */}
          <input
            type="text"
            placeholder="Distributor Name"
            value={newSale.distributor}
            onChange={(e) =>
              setNewSale({ ...newSale, distributor: e.target.value })
            }
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          {/* Product Select */}
          <select
            value={newSale.product}
            onChange={(e) =>
              setNewSale({ ...newSale, product: e.target.value })
            }
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Select Product</option>
            {products.map((p) => (
              <option key={p.id} value={p.name}>
                {p.name}
              </option>
            ))}
          </select>

          {/* Quantity */}
          <input
            type="number"
            placeholder="Quantity"
            value={newSale.quantity}
            onChange={(e) =>
              setNewSale({ ...newSale, quantity: e.target.value })
            }
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          {/* Button */}
          <button
            onClick={handleAddSale}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg py-2 transition-all duration-200"
          >
            Add Sale
          </button>
        </div>

        {/* Live Total BV Preview */}
        {newSale.product && newSale.quantity && (
          <div className="mt-4 flex items-center gap-2 text-green-700">
            <Calculator size={18} />
            <p>
              Estimated BV:{" "}
              <span className="font-bold">
                {calculateBV(newSale.product, parseInt(newSale.quantity))} BV
              </span>
            </p>
          </div>
        )}
      </div>

      {/* Sales Table */}
      <div className="bg-white shadow-md rounded-2xl p-6 border border-green-100">
        <h2 className="text-xl font-semibold text-green-700 mb-6 flex items-center gap-2">
          <User size={20} className="text-green-600" /> Distributor Sales Records
        </h2>

        {sales.length === 0 ? (
          <p className="text-gray-500 text-center py-6">No sales recorded yet.</p>
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
                {sales.map((sale) => (
                  <tr
                    key={sale.id}
                    className="border-b hover:bg-green-50 transition-all duration-200"
                  >
                    <td className="py-3 px-4">{sale.distributor}</td>
                    <td className="py-3 px-4">{sale.product}</td>
                    <td className="py-3 px-4">{sale.quantity}</td>
                    <td className="py-3 px-4 font-semibold text-green-700">
                      {sale.totalBV}
                    </td>
                    <td className="py-3 px-4 text-gray-600">{sale.date}</td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => handleDelete(sale.id)}
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

        {/* Summary Section */}
        {sales.length > 0 && (
          <div className="mt-6 text-right">
            <p className="text-green-800 font-semibold text-lg">
              Total BV Awarded: <span className="text-green-700">{totalBVSum}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sales;
