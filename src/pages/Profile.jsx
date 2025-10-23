import React from "react";
import { User, Briefcase, Package, Star } from "lucide-react";

function Profile() {
  const agent = {
    name: "John Doe",
    role: "Sales Agent",
    email: "john.doe@example.com",
    joined: "March 2024",
    totalSales: 124,
    totalBV: 3450,
    stockAdded: 72,
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Agent Profile
        </h1>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 flex items-center gap-6 mb-10">
          <div className="bg-blue-100 p-4 rounded-full">
            <User className="h-12 w-12 text-blue-600" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">{agent.name}</h2>
            <p className="text-gray-500">{agent.role}</p>
            <p className="text-gray-500 text-sm mt-1">{agent.email}</p>
            <p className="text-gray-400 text-sm">Joined {agent.joined}</p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-blue-600 text-white rounded-xl p-6 flex items-center gap-4 shadow-md">
            <Briefcase className="h-10 w-10 opacity-80" />
            <div>
              <h3 className="text-lg font-semibold">Total Sales</h3>
              <p className="text-2xl font-bold">{agent.totalSales}</p>
            </div>
          </div>

          <div className="bg-green-600 text-white rounded-xl p-6 flex items-center gap-4 shadow-md">
            <Star className="h-10 w-10 opacity-80" />
            <div>
              <h3 className="text-lg font-semibold">Total BV Earned</h3>
              <p className="text-2xl font-bold">{agent.totalBV}</p>
            </div>
          </div>

          <div className="bg-yellow-500 text-white rounded-xl p-6 flex items-center gap-4 shadow-md">
            <Package className="h-10 w-10 opacity-80" />
            <div>
              <h3 className="text-lg font-semibold">Stock Added</h3>
              <p className="text-2xl font-bold">{agent.stockAdded}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
