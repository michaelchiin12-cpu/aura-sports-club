"use client";

import { getUser } from "@/lib/auth";

export default function Header() {
  const user = getUser();

  return (
    <header className="header">

      <div>

        <h2>Dashboard</h2>

        <p>Welcome Back</p>

      </div>

      <div className="header-profile">

        <div className="avatar">

          {user?.nama?.charAt(0).toUpperCase() || "A"}

        </div>

        <div>

          <strong>

            {user?.nama || "Administrator"}

          </strong>

          <p>

            {user?.role || "Admin"}

          </p>

        </div>

      </div>

    </header>
  );
}