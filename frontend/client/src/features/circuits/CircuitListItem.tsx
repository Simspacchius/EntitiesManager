import { useState } from "react";
import { Table, Button } from "semantic-ui-react";
import { Circuit } from "../../app/models/circuit";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";

interface Props {
  circuit: Circuit;
}

export default observer(function CircuitListItem({ circuit }: Props) {
  const { circuitStore } = useStore();
  const { deleteCircuit } = circuitStore;
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  function handleDelete() {
    setIsDeleting(true);
    deleteCircuit(circuit.id)
      .catch((error) => console.log(JSON.stringify(error)))
      .finally(() => setIsDeleting(false));
  }

  return (
    <Table.Row>
      <Table.Cell>{circuit.name}</Table.Cell>
      <Table.Cell>{new Date(circuit.installation_date).toLocaleDateString()}</Table.Cell>
      <Table.Cell textAlign="right">
        <Button
          as={Link}
          to={`/circuitsShow/${circuit.id}`}
          disabled={isDeleting}
          type="button"
          basic
          color='teal'
          icon="eye"
        />
        <Button
          as={Link}
          to={`/circuitsForm/${circuit.id}`}
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
