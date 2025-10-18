import { useState, useMemo } from "react";
import { staffPerformance } from "@/utils/data";
import { Eye } from "lucide-react";

export default function StaffManagement() {
  const currentMonth = new Date().toISOString().slice(0, 7);

  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedArea, setSelectedArea] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");

  // Lọc nhân viên theo tháng, quận và status
  const filteredStaff = useMemo(() => {
    return staffPerformance.filter((s) => {
      const matchesMonth = s.month === selectedMonth;
      const matchesArea =
        selectedArea === "All" ? true : s.area === selectedArea;
      const matchesStatus =
        selectedStatus === "All" ? true : s.status === selectedStatus;
      return matchesMonth && matchesArea && matchesStatus;
    });
  }, [selectedMonth, selectedArea, selectedStatus]);

  // Top performance tháng đã chọn
  const topPerformance = [...filteredStaff]
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 3);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredStaff.length / itemsPerPage);
  const paginatedStaff = filteredStaff.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrev = () => setCurrentPage((p) => Math.max(1, p - 1));
  const handleNext = () => setCurrentPage((p) => Math.min(totalPages, p + 1));

  // Lấy danh sách quận có trong data
  const areas = Array.from(new Set(staffPerformance.map((s) => s.area)));

  return (
    <div className="space-y-8">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:items-end gap-4">
        <div>
          <label className="font-medium text-gray-700">Chọn tháng:</label>
          <input
            type="month"
            value={selectedMonth}
            onChange={(e) => {
              setSelectedMonth(e.target.value);
              setCurrentPage(1);
            }}
            className="border border-gray-300 rounded px-3 py-1 ml-2"
          />
        </div>

        <div>
          <label className="font-medium text-gray-700">Quận:</label>
          <select
            value={selectedArea}
            onChange={(e) => {
              setSelectedArea(e.target.value);
              setCurrentPage(1);
            }}
            className="border border-gray-300 rounded px-3 py-1 ml-2"
          >
            <option value="All">Tất cả</option>
            {areas.map((area) => (
              <option key={area} value={area}>
                {area}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="font-medium text-gray-700">Trạng thái:</label>
          <select
            value={selectedStatus}
            onChange={(e) => {
              setSelectedStatus(e.target.value);
              setCurrentPage(1);
            }}
            className="border border-gray-300 rounded px-3 py-1 ml-2"
          >
            <option value="All">Tất cả</option>
            <option value="Active">Hoạt động</option>
            <option value="Inactive">Không hoạt động</option>
          </select>
        </div>
      </div>

      {/* Top Performance */}
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Nhân viên xuất sắc Tháng {selectedMonth.split("-")[1]}/
          {selectedMonth.split("-")[0]}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {topPerformance.map((staff) => (
            <div
              key={staff.id}
              className="p-5 rounded-xl shadow hover:shadow-lg transition-shadow bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col items-center"
            >
              <h3 className="font-bold text-lg text-gray-900">{staff.name}</h3>
              <p className="text-gray-600 mb-1">Quận: {staff.area}</p>
              <p className="text-gray-800 font-medium">
                Hợp đồng tháng này: {staff.contracts}
              </p>
              <p className="text-gray-800 font-medium">
                Tổng hợp đồng: {staff.totalContracts}
              </p>
              <p className="text-gray-800 font-medium">
                Doanh thu: {staff.revenue.toLocaleString("vi-VN")}₫
              </p>
              <p className="mt-1 text-yellow-500 font-semibold">
                ⭐ {staff.rating}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Full Staff List */}
      <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-x-auto">
        <table className="w-full text-sm text-gray-700">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Mã NV
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Nhân viên
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Quận
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Hợp đồng tháng này
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Tổng hợp đồng
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Doanh thu
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Trạng thái
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Đánh giá
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {paginatedStaff.map((staff) => (
              <tr key={staff.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-medium">{staff.id}</td>
                <td className="px-6 py-4 font-medium">{staff.name}</td>
                <td className="px-6 py-4 text-gray-600">{staff.area}</td>
                <td className="px-6 py-4">{staff.contracts}</td>
                <td className="px-6 py-4">{staff.totalContracts}</td>
                <td className="px-6 py-4 font-medium text-gray-900">
                  {staff.revenue.toLocaleString("vi-VN")}₫
                </td>
                <td className="px-6 py-4 font-medium">
                  <span
                    className={`px-2 py-1 rounded-full text-white text-xs ${
                      staff.status === "Active" ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    {staff.status === "Active"
                      ? "Hoạt động"
                      : "Không hoạt động"}
                  </span>
                </td>
                <td className="px-6 py-4 text-yellow-500 font-semibold">
                  ⭐ {staff.rating}
                </td>
                <td className="px-6 py-4">
                  <button className="text-blue-600 hover:text-blue-700 flex items-center gap-1 font-medium">
                    <Eye size={16} /> Xem
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-end items-center gap-3 p-4">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Trước
          </button>
          <span>
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Sau
          </button>
        </div>
      </div>
    </div>
  );
}
