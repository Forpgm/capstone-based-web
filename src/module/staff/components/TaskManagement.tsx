import { useState } from "react";
import { Button } from "@/components/ui/button";
import { tasksData, type Task, type TaskStepStatus } from "@/store/data";
import { Eye } from "lucide-react";

const PAGE_SIZE = 5;

export default function TaskTable() {
  const [tasks] = useState<Task[]>(tasksData);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(tasks.length / PAGE_SIZE);
  const pagedTasks = tasks.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  // Lấy bước mới nhất (latest step)
  const getLatestStep = (task: Task) => {
    const lastDoneOrInProgress = [...task.steps]
      .reverse()
      .find((s) => s.status === "done" || s.status === "inProgress");
    return lastDoneOrInProgress || task.steps[0];
  };

  // Xác định trạng thái tổng thể (status cuối cùng)
  const getTaskStatus = (task: Task): TaskStepStatus => {
    if (task.steps.every((s) => s.status === "done")) return "done";
    if (task.steps.some((s) => s.status === "inProgress")) return "inProgress";
    return "pending";
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                STT
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Tên Mall
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Địa điểm
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Bước mới nhất
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Trạng thái
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Hành động
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {pagedTasks.map((task, index) => {
              const latestStep = getLatestStep(task);
              const taskStatus = getTaskStatus(task);

              return (
                <tr key={task.id}>
                  <td className="px-4 py-2">
                    {(currentPage - 1) * PAGE_SIZE + index + 1}
                  </td>
                  <td className="px-4 py-2 font-medium">{task.mallName}</td>
                  <td className="px-4 py-2">{task.location}</td>
                  <td className="px-4 py-2">{latestStep.title}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded font-medium text-sm ${
                        taskStatus === "done"
                          ? "text-green-500"
                          : taskStatus === "inProgress"
                            ? " text-blue-500"
                            : "text-gray-500"
                      }`}
                    >
                      {taskStatus === "done"
                        ? "Hoàn tất"
                        : taskStatus === "inProgress"
                          ? "Đang thực hiện"
                          : "Chưa bắt đầu"}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        alert(`Xem chi tiết mall: ${task.mallName}`)
                      }
                    >
                      <Eye size={16} />
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-center space-x-2">
        <Button
          size="sm"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        >
          Trước
        </Button>
        {[...Array(totalPages)].map((_, idx) => (
          <Button
            key={idx + 1}
            size="sm"
            variant={currentPage === idx + 1 ? "default" : "outline"}
            onClick={() => setCurrentPage(idx + 1)}
          >
            {idx + 1}
          </Button>
        ))}
        <Button
          size="sm"
          disabled={currentPage === totalPages}
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
        >
          Sau
        </Button>
      </div>
    </div>
  );
}
