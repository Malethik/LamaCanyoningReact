import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/item">Inventario</Link>
        </li>
        <li>
          <Link to="/supplier">Fornitori</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
