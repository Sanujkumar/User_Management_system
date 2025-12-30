"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Url } from "@/lib/url";
import { useAuthStore } from "@/components/useAuthStor";
import { Button } from "@/components/ui/button";
import { confirmToast } from "@/lib/confirmToast";

type Student = {
    id: number;
    name: string;
    email: string;
    role: string;
    isActive: boolean;
};

export default function AllStudentsTable() {
    const { token } = useAuthStore();

    const [students, setStudents] = useState<Student[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 10;
    const [loading, setLoading] = useState(false);



    const fetchStudents = async () => {
        try {
            setLoading(true);
            const res = await axios.get(
                `${Url}/api/admin/students?page=${page}&limit=${limit}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setStudents(res.data.students);
            setTotalPages(res.data.totalPages);
        } catch (err: any) {
            toast.error(err.response?.data?.message || "Failed to load students");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, [page]);

    const toggleStatus = async (id: number, isActive: boolean) => {
        confirmToast({
            message: `Are you sure you want to ${isActive ? "deactivate" : "activate"} this user?`,
            onConfirm: async () => {
                try {
                    const endpoint = isActive
                        ? `/api/admin/students/${id}/deactivate`
                        : `/api/admin/students/${id}/activate`;

                    await axios.patch(
                        `${Url}${endpoint}`,
                        {},
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );

                    toast.success(
                        `User ${isActive ? "deactivated" : "activated"} successfully`
                    );
                    fetchStudents();
                } catch (err: any) {
                    toast.error(err.response?.data?.message || "Action failed");
                }
            },  
        });
    };

    return (
        <div className="bg-white rounded-lg shadow p-4 min-h-screen">
            <h2 className="text-xl font-semibold mb-4">All Users</h2>

            {loading ? (
                <p className="text-center">Loading...</p>
            ) : (
                <table className="w-full border">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-2 border">Name</th>
                            <th className="p-2 border">Email</th>
                            <th className="p-2 border">Role</th>
                            <th className="p-2 border">Status</th>
                            <th className="p-2 border">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {students.map((student) => (
                            <tr key={student.id} className="text-center">
                                <td className="p-2 border">{student.name}</td>
                                <td className="p-2 border">{student.email}</td>
                                <td className="p-2 border">{student.role}</td>
                                <td className="p-2 border">
                                    {student.isActive ? (
                                        <span className="text-green-600">Active</span>
                                    ) : (
                                        <span className="text-red-600">Inactive</span>
                                    )}
                                </td>
                                <td className="p-2 border">
                                    <Button
                                        size="sm"
                                        variant={student.isActive ? "destructive" : "default"}
                                        onClick={() => toggleStatus(student.id, student.isActive)}
                                    >
                                        {student.isActive ? "Deactivate" : "Activate"}
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

           
            <div className="flex justify-center gap-4 mt-4">
                <Button
                    disabled={page === 1}
                    onClick={() => setPage((p) => p - 1)}
                >
                    Prev
                </Button>

                <span className="font-medium">
                    Page {page} of {totalPages}
                </span>

                <Button
                    disabled={page === totalPages}
                    onClick={() => setPage((p) => p + 1)}
                >
                    Next
                </Button>
            </div>
        </div>
    );
}
