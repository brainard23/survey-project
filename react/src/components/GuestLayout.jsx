import React from "react";
import { Outlet } from "react-router-dom";

export default function GuestLayout() {
  return (
    <>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <Outlet />
        </div>
      </div>
    </>
  );
}
