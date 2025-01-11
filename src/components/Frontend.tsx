import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

const Header = () => {
  return (
    <>
      <h1>CMR LAMA CANYONING</h1>
      <NavBar />
      <Outlet />
    </>
  );
};

export default Header;
