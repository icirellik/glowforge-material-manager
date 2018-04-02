import React from 'react';
import {
  IconMenu,
} from './Icons';
import './Menu.css';

class Menu extends React.Component {
  constructor() {
    super();

    this.state = {
      showMenu: false,
    };

    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  showMenu(event) {
    event.preventDefault();
    this.setState({ showMenu: true }, () => {
      document.addEventListener('click', this.closeMenu);
    });
  }

  closeMenu(event) {
    this.setState({ showMenu: false }, () => {
      document.removeEventListener('click', this.closeMenu);
    });
  }

  render() {
    return (
      <div className="dropdown">
        <IconMenu click={this.showMenu} />
        {
          this.state.showMenu
            ? (
              <div
                className="dropdown-content"
                ref={(element) => {
                  this.dropdownMenu = element;
                }}
              >
                {this.props.children}
              </div>
            ) : (
              null
            )
        }
      </div>
    );
  }
}

export default Menu;
