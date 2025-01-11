import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav>
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
    </nav>
  );
};

export default NavBar;
