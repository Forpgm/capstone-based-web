import { Search } from "lucide-react";
import { useState, useMemo } from "react";
import { pendingVerifications } from "../../../utils/data";
import * as Dialog from "@radix-ui/react-dialog";

export default function VerificationRequests() {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<"All" | "Mall" | "Brand">("All");
  const [statusFilter, setStatusFilter] = useState<
    "All" | "Pending" | "Approved" | "Rejected"
  >("All");
  const [dateFilter, setDateFilter] = useState<
    "All" | "Last7Days" | "Last30Days"
  >("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [modalItem, setModalItem] = useState<
    (typeof pendingVerifications)[0] | null
  >(null);

  const itemsPerPage = 5;

  const parseDate = (dateStr: string) => new Date(dateStr).getTime();

  const filteredData = useMemo(() => {
    const now = Date.now();

    return (
      pendingVerifications
        .filter((item) => {
          // Filter theo search
          const matchesSearch =
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.location.toLowerCase().includes(searchTerm.toLowerCase());

          // Filter theo type
          const matchesType = typeFilter === "All" || item.type === typeFilter;

          // Filter theo status
          const matchesStatus =
            statusFilter === "All" || item.status === statusFilter;

          // Filter theo date
          let matchesDate = true;
          if (dateFilter === "Last7Days") {
            matchesDate = now - parseDate(item.date) <= 7 * 24 * 60 * 60 * 1000;
          } else if (dateFilter === "Last30Days") {
            matchesDate =
              now - parseDate(item.date) <= 30 * 24 * 60 * 60 * 1000;
          }

          return matchesSearch && matchesType && matchesStatus && matchesDate;
        })
        // Sắp xếp ngày gần nhất
        .sort((a, b) => parseDate(b.date) - parseDate(a.date))
    );
  }, [searchTerm, typeFilter, statusFilter, dateFilter]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPage = (page: number) => setCurrentPage(page);
  const handlePrev = () => setCurrentPage((p) => Math.max(p - 1, 1));
  const handleNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages));

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 flex flex-wrap justify-between gap-3">
        <h2 className="text-xl font-bold text-gray-900">Yêu cầu xác thực</h2>

        <div className="flex flex-wrap items-center gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm theo tên hoặc địa điểm..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          {/* Loại (Mall/Brand) */}
          <select
            value={typeFilter}
            onChange={(e) => {
              setTypeFilter(e.target.value as "All" | "Mall" | "Brand");
              setCurrentPage(1);
            }}
            className="px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">Tất cả loại</option>
            <option value="Mall">Mall</option>
            <option value="Brand">Brand</option>
          </select>

          {/* Trạng thái */}
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(
                e.target.value as "All" | "Pending" | "Approved" | "Rejected"
              );
              setCurrentPage(1);
            }}
            className="px-3 py-2 border rounded focus:ring-2 focus:ring-green-500"
          >
            <option value="All">Tất cả trạng thái</option>
            <option value="Pending">Đang chờ</option>
            <option value="Approved">Đã duyệt</option>
            <option value="Rejected">Bị từ chối</option>
          </select>

          {/* Thời gian */}
          <select
            value={dateFilter}
            onChange={(e) => {
              setDateFilter(
                e.target.value as "All" | "Last7Days" | "Last30Days"
              );
              setCurrentPage(1);
            }}
            className="px-3 py-2 border rounded focus:ring-2 focus:ring-purple-500"
          >
            <option value="All">Tất cả ngày</option>
            <option value="Last7Days">7 ngày gần nhất</option>
            <option value="Last30Days">30 ngày gần nhất</option>
          </select>

          {/* Nút Reset */}
          <button
            onClick={() => {
              setSearchTerm("");
              setTypeFilter("All");
              setStatusFilter("All");
              setDateFilter("All");
              setCurrentPage(1);
            }}
            className="px-3 py-2 border rounded bg-gray-200 hover:bg-gray-300"
          >
            Reset filter
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {["Tên", "Loại", "Địa điểm", "Ngày", "Trạng thái"].map((col) => (
                <th
                  key={col}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {paginatedData.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                  {item.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.type === "Mall"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-purple-100 text-purple-700"
                    }`}
                  >
                    {item.type}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                  {item.location}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                  {item.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : item.status === "Approved"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                    }`}
                  >
                    {item.status === "Pending"
                      ? "Đang chờ"
                      : item.status === "Approved"
                        ? "Đã duyệt"
                        : "Bị từ chối"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 p-4 border-t border-gray-200 flex-wrap">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => goToPage(i + 1)}
            className={`px-3 py-1 border rounded ${currentPage === i + 1 ? "bg-blue-500 text-white border-blue-500" : "hover:bg-gray-50"}`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Modal */}
      <Dialog.Root open={!!modalItem} onOpenChange={() => setModalItem(null)}>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 w-11/12 max-w-lg -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-bold mb-4">Chi tiết yêu cầu</h3>
          {modalItem && (
            <div className="space-y-2">
              <p>
                <strong>Name:</strong> {modalItem.name}
              </p>
              <p>
                <strong>Type:</strong> {modalItem.type}
              </p>
              <p>
                <strong>Location:</strong> {modalItem.location}
              </p>
              <p>
                <strong>Date:</strong> {modalItem.date}
              </p>
              <p>
                <strong>Status:</strong> {modalItem.status}
              </p>
            </div>
          )}
          <div className="mt-4 flex justify-end">
            <button
              onClick={() => setModalItem(null)}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Close
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
}
