import { useState } from "react";
import { Plus, Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { contracts } from "@/utils/data";
import { Button } from "@/components/ui/button";

export default function ContractManagement() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filtered = contracts.filter((c) => {
    const matchesSearch =
      c.mall_owner.toLowerCase().includes(search.toLowerCase()) ||
      c.coordination_contract_id.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "All" ? true : c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Tính toán phân trang
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentItems = filtered.slice(startIdx, startIdx + itemsPerPage);

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Quản lý hợp đồng
        </h1>
        <Button className="mt-3 sm:mt-0 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white">
          <Plus size={18} />
          Tạo hợp đồng
        </Button>
      </div>

      {/* Bộ lọc */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
        <input
          type="text"
          placeholder="Tìm theo mã hoặc tên Mall..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1); // reset trang khi search
          }}
          className="border border-gray-300 rounded-lg px-3 py-2 w-full sm:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setCurrentPage(1); // reset trang khi filter
          }}
          className="border border-gray-300 rounded-lg px-3 py-2 w-full sm:w-40"
        >
          <option value="All">Tất cả trạng thái</option>
          <option value="Active">Đang hiệu lực</option>
          <option value="Pending">Chờ ký</option>
          <option value="Terminated">Đã kết thúc</option>
        </select>
      </div>

      {/* Bảng hợp đồng */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-sm border">
        <table className="w-full text-sm text-gray-700">
          <thead className="bg-gray-100 text-gray-900 font-medium">
            <tr>
              <th className="px-4 py-3 text-left">Mã HĐ</th>
              <th className="px-4 py-3 text-left">TTTM</th>
              <th className="px-4 py-3 text-left">Ngày bắt đầu</th>
              <th className="px-4 py-3 text-left">Ngày kết thúc</th>
              <th className="px-4 py-3 text-left">% Hoa hồng</th>
              <th className="px-4 py-3 text-left">Trạng thái</th>
              <th className="px-4 py-3 text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((c) => (
              <tr key={c.coordination_contract_id} className="border-b">
                <td className="px-4 py-3 font-medium">
                  {c.coordination_contract_id}
                </td>
                <td className="px-4 py-3">{c.mall_owner}</td>
                <td className="px-4 py-3">{c.starting_date}</td>
                <td className="px-4 py-3">{c.ending_date}</td>
                <td className="px-4 py-3">{c.commision_percent}%</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      c.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : c.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                    }`}
                  >
                    {c.status === "Active"
                      ? "Đang hiệu lực"
                      : c.status === "Pending"
                        ? "Chờ ký"
                        : "Đã kết thúc"}
                  </span>
                </td>
                <td className="px-4 py-3 text-center flex justify-center gap-3">
                  <button className="text-blue-600 hover:text-blue-800">
                    <Eye size={25} />
                  </button>
                </td>
              </tr>
            ))}
            {currentItems.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="text-center py-6 text-gray-500 italic"
                >
                  Không có hợp đồng nào phù hợp
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Phân trang */}
      <div className="flex justify-center items-center gap-2 mt-4">
        <Button
          variant="outline"
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="flex items-center gap-1"
        >
          <ChevronLeft size={16} /> Trước
        </Button>
        <span>
          Trang {currentPage} / {totalPages}
        </span>
        <Button
          variant="outline"
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="flex items-center gap-1"
        >
          Sau <ChevronRight size={16} />
        </Button>
      </div>
    </div>
  );
}
