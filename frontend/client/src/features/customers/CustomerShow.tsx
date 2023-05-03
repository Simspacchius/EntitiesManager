import { observer } from "mobx-react-lite";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Header,
  Button,
  Container,
  Breadcrumb,
} from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Customer } from "../../app/models/customer";

export default observer(function CustomerShow() {
  const { customerStore } = useStore();
  const { loadCustomer } = customerStore;
  const id = parseInt(useParams().id || "");

  const [customer, setCustomer] = useState<Customer>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    loadCustomer(id)
    .then((customer) => setCustomer(customer!))
    .catch((error) => console.log(JSON.stringify(error)))
    .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <LoadingComponent content="Loading customer..." />;

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
          icon="cancel"
          content="Back"
        />
      </Container>
      <Container>
        <Container className="em-show-field"><b>Name</b>: {customer?.name}</Container>
        <Container className="em-show-field"><b>Email</b>: {customer?.email}</Container>
        <Container className="em-show-field"><b>Vat Number</b>: {customer?.vat_number}</Container>
      </Container>
    </>
  );
});
