import React, { FunctionComponent, MouseEvent } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.scss';

interface NavigationProps {
  click: (e: MouseEvent<HTMLAnchorElement>) => void
}
const Navigation: FunctionComponent<NavigationProps> = (props) => {
  const location = useLocation();

  const setActiveLink = (path: string): string => {
   return location.pathname===`/${path}`?'active':''
  }
  
  const onClickHandler = (e: MouseEvent<HTMLAnchorElement>) => {
    props.click(e);
    e.currentTarget.parentElement?.querySelector('.active')?.classList.remove('active');
    e.currentTarget.classList.add('active');
  }

  return (
    <nav className='navigation' >
      <Link to='/movie' onClick={onClickHandler} className={"navigation__link "+setActiveLink('movie')}>
        Search for Movies
     </Link>
      <Link to='/tv' onClick={onClickHandler} className={"navigation__link "+setActiveLink('tv')}>
        Favorite
     </Link>
    </nav>
  );
};

export default Navigation;
