import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Header, Segment, Icon } from "semantic-ui-react";

export default function HomePage() {
  return (
    <Segment inverted textAlign="center" vertical className="masthead">
      <Container text>
        <Icon name="lightning" color="yellow" size="massive" />
        <Header as="h2" inverted content="Welcome to Entities Manager" />
        <Button as={Link} to="/customers" size="huge" inverted>
          Take me to the customers!
        </Button>
      </Container>
    </Segment>
  );
}
