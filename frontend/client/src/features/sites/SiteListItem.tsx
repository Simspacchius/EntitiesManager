import { useState } from "react";
import { Table, Button } from "semantic-ui-react";
import { Site } from "../../app/models/site";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";

interface Props {
  site: Site;
}

export default observer(function SiteListItem({ site }: Props) {
  const { siteStore } = useStore();
  const { deleteSite } = siteStore;
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  function handleDelete() {
    setIsDeleting(true);
    deleteSite(site.id)
      .catch((error) => console.log(JSON.stringify(error)))
      .finally(() => setIsDeleting(false));
  }

  return (
    <Table.Row>
      <Table.Cell>{site.name}</Table.Cell>
      <Table.Cell>{site.longitude}</Table.Cell>
      <Table.Cell>{site.latitude}</Table.Cell>
      <Table.Cell>{site.address}</Table.Cell>
      <Table.Cell>{site.post_code}</Table.Cell>
      <Table.Cell textAlign="right">
        <Button
          as={Link}
          to={`/sitesShow/${site.id}`}
          disabled={isDeleting}
          type="button"
          basic
          color='teal'
          icon="eye"
        />
        <Button
          as={Link}
          to={`/sitesForm/${site.id}`}
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
