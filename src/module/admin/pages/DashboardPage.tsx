import { useState } from "react";
import { MapPin, TrendingUp, UserCog } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import VerificationRequests from "../components/VerificationRequests";
import {
  areaAssignments,
  mallsBrands,
  monthlyContractsData,
  quarterlyContractsData,
  staffPerformance,
  stats,
} from "../../../utils/data";
import MatchingConfig from "../components/MatchingConfig";
import ClientManagement from "../components/ClientManagement";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [filter, setFilter] = useState("month");
  const data =
    filter === "month" ? monthlyContractsData : quarterlyContractsData;
  const dataKey = filter === "month" ? "month" : "quarter";
  const lastData = data[data.length - 2] || { contracts: 0, revenue: 0 };
  const currentData = data[data.length - 1];
  const contractsChange = lastData.contracts
    ? (
        ((currentData.contracts - lastData.contracts) / lastData.contracts) *
        100
      ).toFixed(1)
    : 0;
  const revenueChange = lastData.revenue
    ? (
        ((currentData.revenue - lastData.revenue) / lastData.revenue) *
        100
      ).toFixed(1)
    : 0;
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Admin Dashboard
        </h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <span
                className={`text-sm font-semibold ${stat.change.startsWith("+") ? "text-green-600" : "text-red-600"}`}
              >
                {stat.change}
              </span>
            </div>
            <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <div className="flex space-x-8">
          {[
            "overview",
            "verifications",
            "staff",
            "clients",
            "areas",
            "matching",
          ].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 px-2 font-medium capitalize transition-colors ${
                activeTab === tab
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab === "overview" && "Tổng quan"}
              {tab === "verifications" && "Yêu cầu xác thực"}
              {tab === "staff" && "Hiệu suất nhân viên"}
              {tab === "clients" && "TTTM & Thương hiệu"}
              {tab === "areas" && "Phân công khu vực"}
              {tab === "matching" && "Matching Mall & Brand"}
            </button>
          ))}
        </div>
      </div>

      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900">
                  Hợp đồng
                </h3>

                <div className="mt-2 sm:mt-0 flex space-x-2">
                  <button
                    onClick={() => setFilter("month")}
                    className={`px-3 py-1 rounded-md font-medium border ${
                      filter === "month"
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    Theo tháng
                  </button>
                  <button
                    onClick={() => setFilter("quarter")}
                    className={`px-3 py-1 rounded-md font-medium border ${
                      filter === "quarter"
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    Theo quý
                  </button>
                </div>
              </div>

              {/* Hiển thị số liệu tổng hợp so với kỳ trước */}
              <div className="flex space-x-6 mb-4 text-sm">
                <div>
                  <p className="text-gray-500">Số hợp đồng hiện tại</p>
                  <p className="font-bold text-gray-900">
                    {currentData.contracts} HĐ{" "}
                    <span
                      className={`ml-2 font-medium ${
                        Number(contractsChange) >= 0
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {Number(contractsChange) >= 0 ? "+" : ""}
                      {contractsChange}%
                    </span>
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Doanh thu ước tính</p>
                  <p className="font-bold text-gray-900">
                    {currentData.revenue}M VND so với{" "}
                    {filter ? "tháng trước" : "quý trước"}
                    <span
                      className={`ml-2 font-medium ${
                        Number(revenueChange) >= 0
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {Number(revenueChange) >= 0 ? "+" : ""}
                      {revenueChange}%
                    </span>
                  </p>
                </div>
              </div>

              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={data}>
                  <XAxis dataKey={dataKey} />
                  <YAxis />
                  <Tooltip formatter={(value) => `${value}`} />
                  <Legend />

                  <Line
                    type="monotone"
                    dataKey={"contracts"}
                    stroke="#0088FE"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            {/* Chart 3: Verification hoàn thành */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Verification hoàn thành
              </h3>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Verification hoàn thành theo ngày
                </h3>
              </div>
            </div>
          </div>

          {/* Top Staff */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">
                Top Performing Staff
              </h2>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Staff Name
                    </th>

                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Contracts
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Revenue
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Rating
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {staffPerformance.map((staff) => (
                    <tr key={staff.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                            {staff.name.charAt(0)}
                          </div>
                          <span className="font-medium text-gray-900">
                            {staff.name}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">
                          {staff.contracts}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                        {staff.revenue}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-yellow-500">
                          ⭐ {staff.rating}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button className="text-blue-600 hover:text-blue-700 font-medium">
                          Xem thêm
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === "verifications" && <VerificationRequests />}

      {activeTab === "staff" && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">
              Staff Performance
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Staff Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Area
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Contracts
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Revenue
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Rating
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {staffPerformance.map((staff) => (
                  <tr key={staff.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                          {staff.name.charAt(0)}
                        </div>
                        <span className="font-medium text-gray-900">
                          {staff.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                      {staff.area}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">
                        {staff.contracts}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                      {staff.revenue}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-yellow-500">⭐ {staff.rating}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button className="text-blue-600 hover:text-blue-700 font-medium">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "clients" && <ClientManagement />}

      {activeTab === "areas" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {areaAssignments.map((area, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-6 h-6 text-blue-600" />
                  <h3 className="text-xl font-bold text-gray-900">
                    {area.area}
                  </h3>
                </div>
                <button className="text-blue-600 hover:text-blue-700">
                  <UserCog className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Assigned Staff:</p>
                  <div className="flex flex-wrap gap-2">
                    {area.staff.map((staffName, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                      >
                        {staffName}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                  <div>
                    <p className="text-sm text-gray-600">Malls</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {area.malls}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Brands</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {area.brands}
                    </p>
                  </div>
                </div>
              </div>

              <button className="w-full mt-4 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium">
                Reassign Staff
              </button>
            </div>
          ))}
        </div>
      )}
      {activeTab === "matching" && (
        // <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        //   <h2 className="text-xl font-bold text-gray-900 mb-4">
        //     Matching Mall & Brand
        //   </h2>

        //   <div className="overflow-x-auto">
        //     <table className="w-full">
        //       <thead className="bg-gray-50 border-b border-gray-200">
        //         <tr>
        //           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
        //             Mall
        //           </th>
        //           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
        //             Brand
        //           </th>
        //           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
        //             Location
        //           </th>
        //           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
        //             Match Score
        //           </th>
        //           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
        //             Date
        //           </th>
        //         </tr>
        //       </thead>
        //       <tbody className="divide-y divide-gray-200">
        //         {matchingData.map((item) => (
        //           <tr key={item.id} className="hover:bg-gray-50">
        //             <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
        //               {item.mallName}
        //             </td>
        //             <td className="px-6 py-4 whitespace-nowrap text-gray-900">
        //               {item.brandName}
        //             </td>
        //             <td className="px-6 py-4 whitespace-nowrap text-gray-600">
        //               {item.location}
        //             </td>
        //             <td className="px-6 py-4 whitespace-nowrap">
        //               <div className="w-full bg-gray-200 rounded-full h-3">
        //                 <div
        //                   className="bg-green-500 h-3 rounded-full"
        //                   style={{ width: `${item.matchScore}%` }}
        //                 />
        //               </div>
        //               <p className="text-xs text-gray-600 mt-1">
        //                 {item.matchScore}%
        //               </p>
        //             </td>
        //             <td className="px-6 py-4 whitespace-nowrap text-gray-600">
        //               {item.date}
        //             </td>
        //           </tr>
        //         ))}
        //       </tbody>
        //     </table>
        //   </div>
        // </div>
        <MatchingConfig />
      )}
    </div>
  );
}
