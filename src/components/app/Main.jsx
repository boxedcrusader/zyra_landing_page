import React from "react";
import Footer from "../landing_page/Footer";
import Welcome from "./Welcome";
import Topics from "./Topics";
import Facts from "./Facts";
import Navbar from "./Navbar";

function Main() {
  return (
    <>
      <div className="flex flex-col min-h-screen bg-gray-900">
        <Navbar />

        <main className="flex-1 overflow-y-auto px-4 sm:px-8 py-6">
          <Welcome />
          <Topics />
          <Facts />
        </main>
      </div>
    </>
  );
}

export default Main;
