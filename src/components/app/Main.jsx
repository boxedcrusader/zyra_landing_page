import React from "react";
import Sidebar from "./Sidebar";
import Footer from "../landing_page/Footer";
import Welcome from "./Welcome";
import Topics from "./Topics";
import Facts from "./Facts";

function Main() {
  return (
    <>
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-auto">
          <div className="flex-1 p-8">
            <Welcome />
            <Topics />
            <Facts />
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Main;
