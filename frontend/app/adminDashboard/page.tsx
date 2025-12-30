"use client";

import { useAuthStore } from "@/components/useAuthStor";
import AllStudentsTable from "@/components/allStudents";

export default function AdminDashboard() {
  const { user } = useAuthStore();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Welcome, <span className="text-blue-500">{user?.name}</span>
      </h1>

      <AllStudentsTable />
    </div>
  );
}
