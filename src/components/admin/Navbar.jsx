import React from "react";
import logo from "../../assets/logo.png";
import { LogOut } from "lucide-react";

function Navbar() {
  return (
    <>
      <nav>
        <div>
          <img src={logo} />
        </div>
        <div>
          <h3>Admin Dashboard</h3>
        </div>
        <div>
          <LogOut size={24} />
        </div>
      </nav>
    </>
  );
}

export default Navbar;
