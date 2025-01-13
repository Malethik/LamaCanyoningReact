import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

const Header = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default Header;
