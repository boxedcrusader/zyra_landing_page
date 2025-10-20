import React, { useEffect, useState } from "react";
import { apiClient } from "../../api/client";

function Welcome() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await apiClient.get("/auth/user/me");
        setUserName(user.first_name);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    fetchUser();
  }, []);

  return (
    <>
      <section>
        <div className="p-8 border-b-black">
          <h1 className="p-6 text-5xl">Welcome, {userName || "User"}</h1>
        </div>
      </section>
    </>
  );
}

export default Welcome;
