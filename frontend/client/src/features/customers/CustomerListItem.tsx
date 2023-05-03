import { useState } from "react";
import { Table, Button } from "semantic-ui-react";
import { Customer } from "../../app/models/customer";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";

interface Props {
  customer: Customer;
}

export default observer(function CustomerListItem({ customer }: Props) {
  const { customerStore } = useStore();
  const { deleteCustomer } = customerStore;
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  function handleDelete() {
    setIsDeleting(true);
    deleteCustomer(customer.id)
      .catch((error) => console.log(JSON.stringify(error)))
      .finally(() => setIsDeleting(false));
  }

  return (
    <Table.Row>
      <Table.Cell>{customer.name}</Table.Cell>
      <Table.Cell>{customer.email}</Table.Cell>
      <Table.Cell>{customer.vat_number}</Table.Cell>
      <Table.Cell textAlign="right">
        <Button
          as={Link}
          to={`/customersShow/${customer.id}`}
          disabled={isDeleting}
          type="button"
          basic
          color='teal'
          icon="eye"
        />
        <Button
          as={Link}
          to={`/customersForm/${customer.id}`}
          disabled={isDeleting}
          type="button"
          basic
          color='teal'
          icon="edit"
        />
        <Button
              onClick={handleDelete}
              loading={isDeleting}
              color="red"
              icon="trash"
        />
      </Table.Cell>
    </Table.Row>
  );
});
