"use client";
// import axios from "axios";
import { useState, useEffect } from "react";

export function Profile() {

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data] = useState<any>(null);

  useEffect(() => {

  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-4">Profile</h1>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
            <div>
              <h2 className="text-lg font-semibold">User Name</h2>
              <p className="text-sm text-gray-500">user@example.com</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Followers</span>
              <span className="font-medium">123</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Following</span>
              <div>{data ? JSON.stringify(data) : "Loading..."}</div>
            </div>
          </div>
          <button className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600">
            Edit Profile
          </button>
        </div>
      </div>
      <div>{data}</div>
    </div>
  );
}
