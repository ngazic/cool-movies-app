import React, {FunctionComponent} from "react";
import {Link, useLocation} from "react-router-dom";
import {Menu} from "antd";
import { FileSearchOutlined, StarOutlined} from '@ant-design/icons';

interface NavigationProps {}
const Navigation: FunctionComponent<NavigationProps> = (props) => {
  const location = useLocation();

  const setActiveLink = (path : string): string => {
    return location.pathname === `/${path}`
      ? "ant-menu-item-selected"
      : "";
  };

  return (<nav className="navigation">
    <Menu mode="horizontal">
      <Menu.Item icon={<FileSearchOutlined />}  className={setActiveLink('search')} >
        <Link to="/search">Search for Movies</Link>
      </Menu.Item>
      <Menu.Item icon={<StarOutlined />} className={setActiveLink('favorite')}>
        <Link to="/favorite">Favorite</Link>
      </Menu.Item>
    </Menu>
  </nav>);
};

export default Navigation;
