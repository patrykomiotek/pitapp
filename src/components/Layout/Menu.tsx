import { NavLink } from "react-router-dom";
import { ROUTE } from "../../routes";
import { ThemeSwitcher } from "components/Theme/ThemeSwitcher";

export const Menu = () => {
  return (
    <nav className="pb-4 border-b-2 border-stone-900  dark:border-slate-500">
      <ul className="flex gap-2">
        <li className="mr-4">
          <NavLink to={ROUTE.HOME.path} className="text-blue-600">
            Home
          </NavLink>
        </li>
        <li className="mr-4">
          <NavLink to={ROUTE.GENERATOR.path} className="text-blue-600">
            Generator
          </NavLink>
        </li>
        <li className="mr-4">
          <NavLink to={ROUTE.PRODUCTS.path} className="text-blue-600">
            Products
          </NavLink>
        </li>
        <li className="mr-4">
          <NavLink to={ROUTE.CREATE_PRODUCT.path} className="text-blue-600">
            Create product
          </NavLink>
        </li>
        <li className="mr-4">
          <ThemeSwitcher />
        </li>
      </ul>
    </nav>
  );
};
