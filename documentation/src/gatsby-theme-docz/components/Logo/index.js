// src/gatsby-theme-docz/components/Logo/index.js
import { React, useEffect } from 'react';
import { Link } from 'gatsby';
import { MdKeyboardArrowUp } from 'react-icons/md';
import { getSessionStorage, setSessionStorage } from '../../hooks/Storage';
import logo from '*/logos/logo.png';
import './index.css';
import '@/main.css';
// '/app/src/multimedia/logos/logo.png';
// '../../../multimedia/logos/logo.png';

export const Logo = () => {
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  }, []);

  const handleScroll = () => {
    const toTop = document.getElementsByClassName('to-top')[0];
    if (toTop) {
      window.pageYOffset > 100
        ? toTop.classList.add('active-to-top')
        : toTop.classList.remove('active-to-top');
    }
  };

  const scrollToTop = (event) => {
    event.preventDefault();
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
  };

  if (!getSessionStorage('logo-animated')) {
    setTimeout(function () {
      setSessionStorage('logo-animated', true);
    }, 2000);
  }

  return (
    <div className="page-logo" onClick={(e) => <Link to="/" />}>
      <img className="image-logo" src={logo} alt="Gatsby_Logo" />
      <Link to="/" className="text-logo">
        Gatsby
        <div className="dinamic-logo">
          {getSessionStorage('logo-animated') ? (
            'Login'
          ) : (
            <div className="typed-out">Login</div>
          )}
        </div>
      </Link>
      <a
        href="#"
        className="to-top"
        onClick={(e) => {
          scrollToTop(e);
        }}
      >
        <MdKeyboardArrowUp />
      </a>
    </div>
  );
};
