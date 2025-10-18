import { useState } from "react";

interface ProfileMenuProps {
  onSwitchToStaff: () => void;
  isStaffView: boolean;
}

export default function ProfileMenu({
  onSwitchToStaff,
  isStaffView,
}: ProfileMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-200"
      >
        <span className="font-medium">{isStaffView ? "Staff" : "Admin"}</span>
        <div className="w-8 h-8 bg-blue-500 rounded-full text-white flex items-center justify-center">
          {isStaffView ? "S" : "A"}
        </div>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border border-gray-200 z-10">
          <button
            onClick={onSwitchToStaff}
            className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-t-lg"
          >
            {isStaffView ? "Admin" : "Staff"}
          </button>
          <button className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-b-lg">
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
