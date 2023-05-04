import { observer } from "mobx-react-lite";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Header,
  Button,
  Container,
  Breadcrumb,
  Divider,
} from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Customer } from "../../app/models/customer";
import CustomerCard from "./CustomerCard";
import EmptyCard from "../../app/layout/EmptyCard";
import SiteList from "../sites/SiteList";

export default observer(function CustomerShow() {
  const { customerStore } = useStore();
  const { selectedCustomer, loadCustomer } = customerStore;
  const id = parseInt(useParams().id || "");

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    loadCustomer(id)
      .catch((error) => console.log(JSON.stringify(error)))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <Container className="em-page-breadcrumb-container">
        <Breadcrumb>
          <Breadcrumb.Section link as={Link} to="/customers">
            Customers
          </Breadcrumb.Section>
          <Breadcrumb.Divider icon="right arrow" />
          <Breadcrumb.Section active>Customer</Breadcrumb.Section>
        </Breadcrumb>
      </Container>

      <Container className="em-page-header-container">
        <Header as="h2" className="em-page-header">
          Customer
        </Header>
        <Button
          as={Link}
          to="/customers"
          floated="right"
          basic
          color="teal"
          icon="arrow left"
          content="Back"
        />
      </Container>

      {isLoading ? (
        <LoadingComponent content="Loading customer..." />
      ) : (
        <>
          <Divider className="em-divider" />
          <div className="em-cards-container">
            {selectedCustomer && <CustomerCard customer={selectedCustomer} />}
            <EmptyCard />
            <EmptyCard />
            <EmptyCard />
          </div>
          <Divider className="em-divider" />
          <Container>
            <SiteList />
          </Container>
        </>
      )}
    </>
  );
});
