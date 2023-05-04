import { observer } from "mobx-react-lite";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Header, Table, Button, Container, Divider } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import LoadingComponent from "../../app/layout/LoadingComponent";
import CustomerListItem from "./CustomerListItem";

export default observer(function CustomerList() {
  const { customerStore } = useStore();
  const { customerRegistry, customers, loadCustomers } = customerStore;

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    loadCustomers()
      .catch((error) => console.log(JSON.stringify(error)))
      .finally(() => setIsLoading(false));
  }, [customerRegistry.size]);

  return (
    <>
      <Container className="em-page-header-container">
        <Header as="h2" className="em-page-header">
          Customers
        </Header>
        <Button
          as={Link}
          to="/customersForm/0"
          floated="right"
          color="teal"
          icon="plus"
          content="New Customer"
        />
      </Container>

      {isLoading ? (
        <LoadingComponent content="Loading customers..." />
      ) : (
        <>
          <Divider className="em-divider" />
          <Table stackable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Email</Table.HeaderCell>
                <Table.HeaderCell>Vat Number</Table.HeaderCell>
                <Table.HeaderCell textAlign="right">Actions</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {customers &&
                customers.map((customer) => (
                  <CustomerListItem key={customer.id} customer={customer} />
                ))}
            </Table.Body>
          </Table>
        </>
      )}
    </>
  );
});
