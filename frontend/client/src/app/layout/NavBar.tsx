import { Icon, Container, Menu } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item as={NavLink} to="/" header>
          <Icon name="lightning" color="yellow" size="large" />
          Entities Manager
        </Menu.Item>
        <Menu.Item as={NavLink} to="/customers" name="Customers" />
      </Container>
    </Menu>
  );
}
