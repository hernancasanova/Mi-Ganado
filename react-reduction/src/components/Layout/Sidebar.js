//import logo200Image from 'assets/img/logo/logo_200.png';
import logoappAn from 'assets/img/logo/ganado_vacuno.png';
import sidebarBgImage from 'assets/img/sidebar/sidebar-4.jpg';
import SourceLink from 'components/SourceLink';
import React from 'react';
import { FaGithub } from 'react-icons/fa';
import {
  MdAccountCircle,
  MdArrowDropDownCircle,
  MdBorderAll,
  MdBrush,
  MdChromeReaderMode,
  MdDashboard,
  MdExtension,
  MdGroupWork,
  MdInsertChart,
  MdKeyboardArrowDown,
  MdNotificationsActive,
  MdPages,
  MdRadioButtonChecked,
  MdSend,
  MdStar,
  MdTextFields,
  MdViewCarousel,
  MdViewDay,
  MdViewList,
  MdWeb,
  MdWidgets,
} from 'react-icons/md';
import {GiCow} from 'react-icons/gi';
import {FiList} from 'react-icons/fi';
import { NavLink } from 'react-router-dom';
import {
  // UncontrolledTooltip,
  Collapse,
  Nav,
  Navbar,
  NavItem,
  NavLink as BSNavLink,
} from 'reactstrap';
import bn from 'utils/bemnames';

const sidebarBackground = {
  backgroundImage: `url("${sidebarBgImage}")`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
};

const navVacunos = [
//{ to: '/listado', name: 'Listado de animales', exact: true, Icon: MdRadioButtonChecked },
  { to: '/listado_vacunos', name: 'Listado', exact: true, Icon: FiList },
  { to: '/registrar_vacuno', name: 'Registrar', exact: true, Icon: MdDashboard },
];
const navAretes = [
  //{ to: '/listado', name: 'Listado de animales', exact: true, Icon: MdRadioButtonChecked },
  
  { to: '/registrar_arete', name: 'Registrar', exact: true, Icon: MdDashboard },
  ];
const navItems = [
  { to: '/listado', name: 'Listado de animales', exact: true, Icon: MdDashboard },
];

const bem = bn.create('sidebar');

class Sidebar extends React.Component {
  state = {
    isOpenVacunos: true,
    isOpenAretes: true,
    isOpenComponents: true,
    isOpenContents: true,
    isOpenPages: true,
  };

  handleClick = name => () => {
    this.setState(prevState => {
      const isOpen = prevState[`isOpen${name}`];

      return {
        [`isOpen${name}`]: !isOpen,
      };
    });
  };

  render() {
    return (
      <aside className={bem.b()} data-image={sidebarBgImage}>
        <div className={bem.e('background')} style={sidebarBackground} />
        <div className={bem.e('content')}>
          <Navbar>
            <SourceLink className="navbar-brand d-flex">
              <img
                src={logoappAn}
                width="120"
                height="40"
                className="pr-20"
                alt=""
              />
            </SourceLink>
          </Navbar>
          <Nav vertical>
            <NavItem
              className={bem.e('nav-item')}
              onClick={this.handleClick('Vacunos')}
            >
              <BSNavLink className={bem.e('nav-item-collapse')}>
                <div className="d-flex">
                  <GiCow className={bem.e('nav-item-icon')} />
                  {/*<MdExtension className={bem.e('nav-item-icon')} />*/}
                  <span className=" align-self-start">Vacunos</span>
                </div>
                <MdKeyboardArrowDown
                  className={bem.e('nav-item-icon')}
                  style={{
                    padding: 0,
                    transform: this.state.isOpenVacunos
                      ? 'rotate(0deg)'
                      : 'rotate(-90deg)',
                    transitionDuration: '0.3s',
                    transitionProperty: 'transform',
                  }}
                />
              </BSNavLink>
            </NavItem>
            <Collapse isOpen={this.state.isOpenVacunos}>
              {navVacunos.map(({ to, name, exact, Icon }, index) => (
                <NavItem key={index} className={bem.e('nav-item')}>
                  <BSNavLink
                    id={`navItem-${name}-${index}`}
                    //className="text-uppercase"
                    tag={NavLink}
                    to={to}
                    activeClassName="active"
                    exact={exact}
                  >
                    <Icon className={bem.e('nav-item-icon')} />
                    <span className="">{name}</span>
                  </BSNavLink>
                </NavItem>
              ))}
            </Collapse>
            <NavItem
              className={bem.e('nav-item')}
              onClick={this.handleClick('Aretes')}
            >
              <BSNavLink className={bem.e('nav-item-collapse')}>
                <div className="d-flex">
                  <MdExtension className={bem.e('nav-item-icon')} />
                  <span className=" align-self-start">Aretes</span>
                </div>
                <MdKeyboardArrowDown
                  className={bem.e('nav-item-icon')}
                  style={{
                    padding: 0,
                    transform: this.state.isOpenAretes
                      ? 'rotate(0deg)'
                      : 'rotate(-90deg)',
                    transitionDuration: '0.3s',
                    transitionProperty: 'transform',
                  }}
                />
              </BSNavLink>
            </NavItem>
            <Collapse isOpen={this.state.isOpenAretes}>
              {navAretes.map(({ to, name, exact, Icon }, index) => (
                <NavItem key={index} className={bem.e('nav-item')}>
                  <BSNavLink
                    id={`navItem-${name}-${index}`}
                    //className="text-uppercase"
                    tag={NavLink}
                    to={to}
                    activeClassName="active"
                    exact={exact}
                  >
                    <Icon className={bem.e('nav-item-icon')} />
                    <span className="">{name}</span>
                  </BSNavLink>
                </NavItem>
              ))}
            </Collapse>
          </Nav>
        </div>
      </aside>
    );
  }
}

export default Sidebar;
