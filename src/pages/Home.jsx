import React from "react";
import { Package, ShoppingBag, Users, Award } from "lucide-react";

const Home = () => {
  // Mock summary data (will come from backend later)
  const totalStock = 240;
  const totalSales = 128;
  const totalDistributors = 34;
  const totalBV = 4520;

  const stats = [
    {
      title: "Total Stock Items",
      value: totalStock,
      icon: <Package className="w-8 h-8 text-green-600" />,
      color: "from-green-100 to-green-50",
    },
    {
      title: "Total Sales Transactions",
      value: totalSales,
      icon: <ShoppingBag className="w-8 h-8 text-blue-600" />,
      color: "from-blue-100 to-blue-50",
    },
    {
      title: "Active Distributors",
      value: totalDistributors,
      icon: <Users className="w-8 h-8 text-yellow-600" />,
      color: "from-yellow-100 to-yellow-50",
    },
    {
      title: "Total BV Points Awarded",
      value: totalBV,
      icon: <Award className="w-8 h-8 text-purple-600" />,
      color: "from-purple-100 to-purple-50",
    },
  ];

  return (
    <div className="pt-24 px-6 md:px-12 min-h-screen bg-gradient-to-br from-green-50 to-white">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-3">
          Welcome to Green World Stock & Sales System
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Monitor your stock, track distributor sales, and manage BV performance efficiently.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`bg-gradient-to-b ${stat.color} rounded-2xl shadow-md hover:shadow-xl p-6 flex flex-col items-center text-center transition-transform duration-300 hover:-translate-y-1`}
          >
            <div className="mb-4 animate-pulse">{stat.icon}</div>
            <h2 className="text-lg font-semibold text-gray-700">{stat.title}</h2>
            <p className="text-3xl font-bold text-green-700 mt-2">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Overview */}
      <div className="bg-white rounded-3xl shadow-md p-8 md:p-10">
        <h2 className="text-2xl font-semibold text-green-800 mb-6">Performance Overview</h2>
        <p className="text-gray-700 leading-relaxed">
          The <span className="font-semibold text-green-700">Green World Mwingi Branch</span> system
          provides a streamlined experience for managing medicinal product stock, tracking distributor
          sales, and calculating BV (Bonus Value) points automatically.
        </p>
        <p className="text-gray-700 leading-relaxed mt-4">
          Admins gain real-time visibility into inventory levels, sales performance, and distributor activity
          — enabling smarter business insights and accountability.
        </p>
      </div>
    </div>
  );
};

export default Home;
