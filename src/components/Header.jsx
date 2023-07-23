import React from "react";
import Logo from "./Logo";
import Location from "./Location";

function Header() {
  // Render the header component with logo and location components
  return (
    <div className="flex justify-between">
      <Logo />
      <Location />
    </div>
  );
}

export default Header;
