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
      // Se la finestra diventa desktop, chiudi il menu mobile
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleToggle = () => {
    setIsMenuOpen(!isMenuOpen); // Cambia lo stato del menu
  };

  return (
    <>
      <Navbar fluid rounded>
        <h1>CMR LAMA CANYONING</h1>
        <Navbar.Toggle onClick={handleToggle} />
        <Navbar.Collapse
          className={isDesktop ? "flex" : isMenuOpen ? "block" : "hidden"}
        >
          <Navbar.Link
            className="block py-2 pl-3 pr-4 md:p-0 bg-green-100 md:bg-transparent md:text-cyan-700"
            as={Link}
            to="/"
            title="Home"
          >
            Home
          </Navbar.Link>
          <Navbar.Link
            className="block py-2 pl-3 pr-4 md:p-0 bg-green-100 md:bg-transparent md:text-cyan-700"
            as={Link}
            to="/item"
            title="Inventario"
          >
            Inventario
          </Navbar.Link>
          <Navbar.Link
            className="block py-2 pl-3 pr-4 md:p-0 bg-green-100 md:bg-transparent md:text-cyan-700"
            as={Link}
            to="/supplier"
            title="Fornitori"
          >
            Fornitori
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
      {/* <nav>
        <ul>
          <li>
            <Link to="/" title="Home">
              Home
            </Link>
          </li>
          <li>
            <Link to="/item" title="Inventario">
              Inventario
            </Link>
          </li>
          <li>
            <Link to="/supplier" title="Fornitori">
              Fornitori
            </Link>
          </li>
        </ul>
      </nav> */}
    </>
  );
};

export default NavBar;
