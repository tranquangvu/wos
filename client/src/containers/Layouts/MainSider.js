import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';

import logo from '../../assets/images/logo.png';

const { Sider } = Layout;
const MenuItem = Menu.Item;

class MainSider extends Component {
  state = {
    collapsed: true
  }

  toggle = () => {
    this.setState({ collapsed: !this.state.collapsed });
  }

  close = () => {
    this.setState({ collapsed: true });
  }

  renderMenuItem = (menuItem, index) => {
    return (
      <MenuItem key={index}>
        <NavLink to={menuItem.path} exact={true}>
          <Icon type={menuItem.icon} />
          <span>{menuItem.text}</span>
        </NavLink>
      </MenuItem>
    );
  }

  render() {
    const menuItems = [
      { path: '/', text: 'Menu', icon: 'bars' },
      { path: '/cart', text: 'Your Order', icon: 'clock-circle-o' },
      { path: '/promotions', text: 'Promotions', icon: 'book' },
    ]
    const activedMenuIndex = menuItems.findIndex(m => m.path === this.props.location.pathname).toString();

    return (
      <div className='main-sider-container'>
        {/* SIDER OVERLAY */}
        {!this.state.collapsed && <div className='main-sider-overlay'></div>}

        {/* MAIN SIDER */}
        <Sider
          trigger={null}
          collapsible
          collapsedWidth={0}
          collapsed={this.state.collapsed}
          className='main-sider-content'
        >
          {/* CLOSE SIDER BUTTON */}
          <a
            className='main-sider-close-button'
            onClick={this.close}
          >
            <Icon type='close-circle'/>
          </a>

          {/* SIDER LOGO */}
          <div className='main-sider-logo'>
            <img src={logo} alt='main-sider-logo' />
          </div>

          {/* SIDER ITEMS */}
          <Menu
            mode='inline'
            theme='light'
            selectedKeys={[activedMenuIndex]}
            className='main-sider-menu'
          >
            {menuItems.map((menuItem, index) => this.renderMenuItem(menuItem, index))}
          </Menu>
        </Sider>
      </div>
    );
  }
}

export default withRouter(MainSider);
