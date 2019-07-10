import React from 'react';
import IconHamburgerMenu from './icons/IconHamburgerMenu';
import './Menu.css';

interface MenuState {
  showMenu: boolean;
}

class Menu extends React.Component<{}, MenuState>  {

  dropdownMenu: HTMLElement | null = null;

  constructor(props: {}) {
    super(props);

    this.state = {
      showMenu: false,
    };

    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  showMenu(event: React.MouseEvent) {
    event.preventDefault();
    this.setState({ showMenu: true }, () => {
      document.addEventListener('click', this.closeMenu);
    });
  }

  closeMenu(event: Event) {
    this.setState({ showMenu: false }, () => {
      document.removeEventListener('click', this.closeMenu);
    });
  }

  render() {
    return (
      <div className="dropdown">
        <IconHamburgerMenu
          click={this.showMenu}
          className="materialList__iconHover"
          height="18px"
          width="18px"
        />
        {
          this.state.showMenu ? (
            <div
              className="dropdown-content"
              ref={(element) => {
                this.dropdownMenu = element;
              }}
            >
              {this.props.children}
            </div>
          ) : null
        }
      </div>
    );
  }
}

export default Menu;
