import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './../style/navbar.scss';

interface INavbar {
  navlist: { navTo: string; title: string }[];
}

export function Navbar({ navlist }: INavbar) {
  const Items = navlist.map((item, i) => (
    <React.Fragment key={i}>
      <li>
        <Link key={i.toString()} to={item.navTo}>
          {item.title}
        </Link>
      </li>
    </React.Fragment>
  ));
  return (
    <Container fluid>
      <nav className="navContainer">
        <ul>{Items}</ul>
      </nav>
    </Container>
  );
}
