"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuthStore } from "@/components/useAuthStor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Url } from "@/lib/url";

export default function Profile() {
  const { user, token, setAuth } = useAuthStore();

  const [editMode, setEditMode] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  if (!user) return null;

  
  const handleSaveProfile = async () => {
    if (!name || !email) {
      toast.error("Name and email are required");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.put(
        `${Url}/api/user/profile`,
        { name, email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    
      setAuth(token!, {
        ...user,
        name,
        email,
      });

      toast.success("Profile updated successfully");
      setEditMode(false);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Profile update failed");
    } finally {
      setLoading(false);
    }
  };

 
  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword) {
      toast.error("Please fill all password fields");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("New password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);

      await axios.put(
        `${Url}/api/user/change-password`,
        { oldPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Password changed successfully");
      setOldPassword("");
      setNewPassword("");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Password change failed");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-2xl shadow p-5 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">User Profile</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="font-medium">Full Name</label>
          <Input
            disabled={!editMode}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label className="font-medium">Email</label>
          <Input
            disabled={!editMode}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-700">
        <p>
          <strong>Role:</strong> {user.role}
        </p>

        <p>
          <strong>Status:</strong>{" "}
          {user.isActive ? (
            <span className="text-green-600 font-medium">Active</span>
          ) : (
            <span className="text-red-600 font-medium">Inactive</span>
          )}
        </p>

        <p className="md:col-span-2">
          <strong>Last Login:</strong>{" "}
          {user.lastLogin
            ? new Date(user.lastLogin).toLocaleString()
            : "Never"}
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        {editMode ? (
          <>
            <Button onClick={handleSaveProfile} disabled={loading}>
              Save
            </Button>

            <Button
              variant="outline"
              onClick={() => {
                setEditMode(false);
                setName(user.name);
                setEmail(user.email);
              }}
            >
              Cancel
            </Button>
          </>
        ) : (
          <Button onClick={() => setEditMode(true)}>Edit Profile</Button>
        )}
      </div>

      <hr />

   
      <div className="space-y-3">
        <h3 className="text-lg font-semibold">Change Password</h3>

        <Input
          type="password"
          placeholder="Old password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />

        <Input
          type="password"
          placeholder="New password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <Button
          variant="destructive"
          onClick={handleChangePassword}
          disabled={loading}
        >
          Change Password
        </Button>
      </div>
    </div>
  );
}  
