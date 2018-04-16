import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Icon } from 'antd';

class MainFooter extends Component {
  renderNavItem = (link, index) => {
    return (
      <li key={index} className='footer-navigation-item'>
        <NavLink
          exact={true}
          to={link.path}
          className='footer-navigation-link'
        >
          <Icon type={link.icon} />
          <span>{link.text}</span>
        </NavLink>
      </li>
    );
  }

  render() {
    const links = [
      { path: '/', text: 'Menu', icon: 'bars' },
      { path: '/cart', text: 'Your Order', icon: 'clock-circle-o' },
      { path: '/promotions', text: 'Promotions', icon: 'book' },
    ]

    return (
      <footer className='main-footer-container'>
        <ul className='footer-navigation'>
          {links.map((link, index) => this.renderNavItem(link, index))}
        </ul>
      </footer>
    );
  }
}

export default MainFooter;
