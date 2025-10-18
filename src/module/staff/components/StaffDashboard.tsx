import { useState } from "react";
import { Check, Home, Briefcase } from "lucide-react";
import TaskManagement from "./TaskManagement";

export default function StaffDashboard() {
  const [activeTab, setActiveTab] = useState<"tasks" | "malls" | "rentals">(
    "tasks"
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md border-r border-gray-200 p-6 flex flex-col">
        <button
          onClick={() => setActiveTab("tasks")}
          className={`flex items-center mb-4 px-4 py-2 rounded ${
            activeTab === "tasks"
              ? "bg-blue-100 text-blue-700"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          <Check className="w-5 h-5 mr-2" /> Quản lý Tiến Độ
        </button>
        <button
          onClick={() => setActiveTab("malls")}
          className={`flex items-center mb-4 px-4 py-2 rounded ${
            activeTab === "malls"
              ? "bg-blue-100 text-blue-700"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          <Home className="w-5 h-5 mr-2" /> Quản lý Trung Tâm Thương Mại
        </button>
        <button
          onClick={() => setActiveTab("rentals")}
          className={`flex items-center mb-4 px-4 py-2 rounded ${
            activeTab === "rentals"
              ? "bg-blue-100 text-blue-700"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          <Briefcase className="w-5 h-5 mr-2" /> Quản lý Thuê Mặt Bằng
        </button>
      </div>

      {/* Main content */}
      <div className="flex-1 p-6">
        {activeTab === "tasks" && (
          //   tasks.map((task) => (
          //     <div
          //       key={task.id}
          //       className="bg-white shadow-sm rounded-lg border border-gray-200 p-6 mb-4"
          //     >
          //       <div className="flex items-center justify-between mb-2">
          //         <h2 className="text-xl font-bold">{task.mallName}</h2>
          //         <span className="text-gray-500 text-sm">{task.location}</span>
          //       </div>
          //       <p className="text-gray-600 text-sm mb-2">
          //         Manager: {task.manager}
          //       </p>

          //       <button
          //         onClick={() =>
          //           setSelectedTask(selectedTask === task.id ? null : task.id)
          //         }
          //         className="flex items-center px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 mb-2"
          //       >
          //         <FileText className="w-4 h-4 mr-1" /> View Task Steps
          //       </button>

          //       {selectedTask === task.id && (
          //         <div className="mt-2 border-t pt-2 space-y-4">
          //           {task.steps.map((step: TaskStep) => (
          //             <div
          //               key={step.id}
          //               className="p-4 border rounded bg-gray-50 flex flex-col space-y-2"
          //             >
          //               <div className="flex justify-between items-center">
          //                 <h3 className="font-semibold">{step.title}</h3>
          //                 <span
          //                   className={`px-2 py-1 rounded-full text-sm font-medium ${
          //                     step.status === "pending"
          //                       ? "bg-yellow-100 text-yellow-800"
          //                       : step.status === "inProgress"
          //                         ? "bg-blue-100 text-blue-700"
          //                         : "bg-green-100 text-green-700"
          //                   }`}
          //                 >
          //                   {step.status.toUpperCase()}
          //                 </span>
          //               </div>

          //               {step.documents && step.documents.length > 0 && (
          //                 <div>
          //                   <p className="font-medium text-gray-700">
          //                     Documents:
          //                   </p>
          //                   <ul className="list-disc list-inside text-gray-600">
          //                     {step.documents.map((doc: string, idx) => (
          //                       <li key={idx}>{doc}</li>
          //                     ))}
          //                   </ul>
          //                 </div>
          //               )}

          //               {step.tenantRequests &&
          //                 step.tenantRequests.length > 0 && (
          //                   <div>
          //                     <p className="font-medium text-gray-700">
          //                       Tenant Requests:
          //                     </p>
          //                     <ul className="list-disc list-inside text-gray-600">
          //                       {step.tenantRequests.map((req, idx) => (
          //                         <li key={idx}>{req}</li>
          //                       ))}
          //                     </ul>
          //                   </div>
          //                 )}

          //               <div className="flex space-x-2 mt-2">
          //                 {(
          //                   ["pending", "inProgress", "done"] as TaskStepStatus[]
          //                 ).map((status) => (
          //                   <button
          //                     key={status}
          //                     onClick={() =>
          //                       handleUpdateStepStatus(task.id, step.id, status)
          //                     }
          //                     className={`px-3 py-1 rounded font-medium text-white ${
          //                       status === "pending"
          //                         ? "bg-yellow-500 hover:bg-yellow-600"
          //                         : status === "inProgress"
          //                           ? "bg-blue-500 hover:bg-blue-600"
          //                           : "bg-green-500 hover:bg-green-600"
          //                     }`}
          //                   >
          //                     {status}
          //                   </button>
          //                 ))}
          //               </div>
          //             </div>
          //           ))}
          //         </div>
          //       )}
          //     </div>
          //   ))}
          <TaskManagement />
        )}

        {/* Malls tab placeholder */}
        {activeTab === "malls" && <div>Mall Management (chưa triển khai)</div>}

        {/* Rentals tab placeholder */}
        {activeTab === "rentals" && (
          <div>Rental Management (chưa triển khai)</div>
        )}
      </div>
    </div>
  );
}
