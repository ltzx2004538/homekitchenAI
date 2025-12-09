import React from "react";
import { useUser } from "../../hooks/user";

export default function HomePage() {
  const { user, kitchen, loading } = useUser();

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Welcome to {kitchen?.name}</h1>
      {loading ? (
        <p>Loading user...</p>
      ) : (
        <p>
          Hi, {user?.name || "User"}! Explore your kitchen, recipes, and more.
        </p>
      )}
    </div>
  );
}
