import { NavLink } from "react-router-dom";
import { ROUTE } from "../../routes";

export const Menu = () => {
  return (
    <nav className="mb-8">
      <ul className="flex gap-2">
        <li>
          <NavLink to={ROUTE.HOME.path} className="text-blue-600">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to={ROUTE.GENERATOR.path} className="text-blue-600">
            Generator
          </NavLink>
        </li>
        <li>
          <NavLink to={ROUTE.PRODUCTS.path} className="text-blue-600">
            Products
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
