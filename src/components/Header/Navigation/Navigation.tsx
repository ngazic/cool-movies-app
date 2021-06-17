import React, {FunctionComponent} from "react";
import {Link, useLocation} from "react-router-dom";
import "./Navigation.scss";

interface NavigationProps {}
const Navigation: FunctionComponent<NavigationProps> = (props) => {
  const location = useLocation();

  const setActiveLink = (path : string): string => {
    return location.pathname === `/${path}`
      ? "active"
      : "";
  };

  return (<nav className="navigation">
    <Link to="/search" className={"navigation__link " + setActiveLink("search")}>
      Search for Movies
    </Link>
    <Link to="/favorite" className={"navigation__link " + setActiveLink("favorite")}>
      Favorite
    </Link>
  </nav>);
};

export default Navigation;
