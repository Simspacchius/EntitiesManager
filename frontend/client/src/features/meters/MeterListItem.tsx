import { useState } from "react";
import { Table, Button } from "semantic-ui-react";
import { Meter } from "../../app/models/meter";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";

interface Props {
  meter: Meter;
}

export default observer(function MeterListItem({ meter }: Props) {
  const { meterStore } = useStore();
  const { deleteMeter } = meterStore;
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  function handleDelete() {
    setIsDeleting(true);
    deleteMeter(meter.id)
      .catch((error) => console.log(JSON.stringify(error)))
      .finally(() => setIsDeleting(false));
  }

  return (
    <Table.Row>
      <Table.Cell>{meter.name}</Table.Cell>
      <Table.Cell>{meter.serial_number}</Table.Cell>
      <Table.Cell>{new Date(meter.installation_date).toLocaleDateString()}</Table.Cell>
      <Table.Cell textAlign="right">
        <Button
          as={Link}
          to={`/metersShow/${meter.id}`}
          disabled={isDeleting}
          type="button"
          basic
          color='teal'
          icon="eye"
        />
        <Button
          as={Link}
          to={`/metersForm/${meter.id}`}
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
