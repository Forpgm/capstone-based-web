import { monthlyContractsData, quarterlyContractsData } from "@/store/data";
import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// 🔹 Dữ liệu mẫu cho verification
const weeklyVerificationsData = [
  { week: "Tuần 1", verifications: 12 },
  { week: "Tuần 2", verifications: 18 },
  { week: "Tuần 3", verifications: 25 },
  { week: "Tuần 4", verifications: 30 },
];

const monthlyVerificationsData = [
  { month: "Tháng 6", verifications: 80 },
  { month: "Tháng 7", verifications: 95 },
  { month: "Tháng 8", verifications: 110 },
  { month: "Tháng 9", verifications: 140 },
  { month: "Tháng 10", verifications: 160 },
];

export default function DashboardOverview() {
  const [filter, setFilter] = useState("month");
  const [verificationFilter, setVerificationFilter] = useState("week");

  // --- Chart hợp đồng ---
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

  // --- Chart verification ---
  const verificationData =
    verificationFilter === "week"
      ? weeklyVerificationsData
      : monthlyVerificationsData;
  const verificationKey = verificationFilter === "week" ? "week" : "month";

  const lastVerification = verificationData[verificationData.length - 2] || {
    verifications: 0,
  };
  const currentVerification = verificationData[verificationData.length - 1];
  const verificationChange = lastVerification.verifications
    ? (
        ((currentVerification.verifications - lastVerification.verifications) /
          lastVerification.verifications) *
        100
      ).toFixed(1)
    : 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* --- Chart Hợp đồng + Doanh thu --- */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900">Hợp đồng</h3>

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

        {/* Hiển thị tổng hợp */}
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
              {currentData.revenue}M VND{" "}
              <span
                className={`ml-2 font-medium ${
                  Number(revenueChange) >= 0 ? "text-green-600" : "text-red-600"
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
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="contracts"
              stroke="#0088FE"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#00C49F"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* --- Chart Verification --- */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900">
            Verification hoàn thành
          </h3>

          <div className="mt-2 sm:mt-0 flex space-x-2">
            <button
              onClick={() => setVerificationFilter("week")}
              className={`px-3 py-1 rounded-md font-medium border ${
                verificationFilter === "week"
                  ? "bg-green-600 text-white border-green-600"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
            >
              Theo tuần
            </button>
            <button
              onClick={() => setVerificationFilter("month")}
              className={`px-3 py-1 rounded-md font-medium border ${
                verificationFilter === "month"
                  ? "bg-green-600 text-white border-green-600"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
            >
              Theo tháng
            </button>
          </div>
        </div>

        <div className="text-sm mb-4">
          <p className="text-gray-500">Tổng verification hiện tại</p>
          <p className="font-bold text-gray-900">
            {currentVerification.verifications} lượt{" "}
            <span
              className={`ml-2 font-medium ${
                Number(verificationChange) >= 0
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {Number(verificationChange) >= 0 ? "+" : ""}
              {verificationChange}%
            </span>
          </p>
        </div>

        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={verificationData}>
            <XAxis dataKey={verificationKey} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="verifications"
              stroke="#10B981"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
