import { observer } from "mobx-react-lite";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Header, Table, Button, Container } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import LoadingComponent from "../../app/layout/LoadingComponent";
import MeterListItem from "./MeterListItem";

export default observer(function MeterList() {
  const { meterStore, siteStore } = useStore();
  const { meterRegistry, meters, loadMetersBySite } = meterStore;
  const { selectedSite } = siteStore;

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    loadMetersBySite(selectedSite!.id)
    .catch((error) => console.log(JSON.stringify(error)))
    .finally(() => setIsLoading(false));
  }, [meterRegistry.size]);

  return (
    <>
      <Container className="em-page-header-container">
        <Header as="h2" className="em-page-header">
          Meters
        </Header>
        <Button
          as={Link}
          to="/metersForm/0"
          floated="right"
          color="teal"
          icon="plus"
          content="New Meter"
        />
      </Container>

      {isLoading ? (
        <LoadingComponent content="Loading meters..." />
      ) : (
        <Table stackable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Serial Number</Table.HeaderCell>
              <Table.HeaderCell>Installation Date</Table.HeaderCell>
              <Table.HeaderCell textAlign="right">Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {meters &&
              meters.map((meter) => <MeterListItem key={meter.id} meter={meter} />)}
          </Table.Body>
        </Table>
      )}
    </>
  );
});