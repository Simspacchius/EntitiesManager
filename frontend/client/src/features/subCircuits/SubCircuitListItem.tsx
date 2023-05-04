import { useState } from "react";
import { Table, Button } from "semantic-ui-react";
import { Circuit } from "../../app/models/circuit";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";

interface Props {
  subCircuit: Circuit;
}

export default observer(function SubCircuitListItem({ subCircuit }: Props) {
  const { subCircuitStore } = useStore();
  const { deleteCircuit } = subCircuitStore;
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  function handleDelete() {
    setIsDeleting(true);
    deleteCircuit(subCircuit.id)
      .catch((error) => console.log(JSON.stringify(error)))
      .finally(() => setIsDeleting(false));
  }

  return (
    <Table.Row>
      <Table.Cell>{subCircuit.name}</Table.Cell>
      <Table.Cell>{new Date(subCircuit.installation_date).toLocaleDateString()}</Table.Cell>
      <Table.Cell textAlign="right">
        <Button
          as={Link}
          to={`/subCircuitsForm/${subCircuit.id}`}
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
