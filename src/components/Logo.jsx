import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

function Logo() {
  // Render a logo with a link to the home page
  return (
    <Link to={"/"}>
      <div className="flex items-center top-4 left-5">
        <img src={logo} alt="logo" className="w-10 h-10 mr-2" />
        <h1 className="text-2xl font-semibold">Weather</h1>
      </div>
    </Link>
  );
}

export default Logo;
