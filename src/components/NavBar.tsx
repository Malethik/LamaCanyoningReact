"use client";
import { Navbar } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleLinkClick = () => {
    if (!isDesktop) {
      setIsMenuOpen(false);
    }
  };

  return (
    <>
      <Navbar fluid rounded>
        <h1>CMR LAMA CANYONING</h1>
        <Navbar.Toggle onClick={handleToggle} />
        <Navbar.Collapse
          className={`${
            isDesktop ? "flex" : isMenuOpen ? "block" : "hidden"
          } rounded-lg  mt-2.5`}
        >
          <Navbar.Link
            className="block py-2 pl-3 pr-4 md:p-0 bg-green-100  md:bg-transparent md:text-cyan-700"
            as={Link}
            to="/"
            title="Home"
            onClick={handleLinkClick}
          >
            Home
          </Navbar.Link>
          <Navbar.Link
            className="block py-2 pl-3 pr-4 md:p-0 bg-green-100  md:bg-transparent md:text-cyan-700"
            as={Link}
            to="/item"
            title="Inventario"
            onClick={handleLinkClick}
          >
            Inventario
          </Navbar.Link>
          <Navbar.Link
            className="block py-2 pl-3 pr-4 md:p-0 bg-green-100  md:bg-transparent md:text-cyan-700"
            as={Link}
            to="/supplier"
            title="Fornitori"
            onClick={handleLinkClick}
          >
            Fornitori
          </Navbar.Link>
          <Navbar.Link
            className="block py-2 pl-3 pr-4 md:p-0 bg-green-100  md:bg-transparent md:text-cyan-700"
            as={Link}
            to="/order"
            title="Ordini"
            onClick={handleLinkClick}
          >
            Ordini
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default NavBar;
