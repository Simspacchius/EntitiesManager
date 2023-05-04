import { observer } from "mobx-react-lite";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Header,
  Table,
  Button,
  Container
} from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import LoadingComponent from "../../app/layout/LoadingComponent";
import CircuitListItem from "./CircuitListItem";
import BlankSlate from "../../app/common/BlankSlate";

export default observer(function CircuitList() {
  const { circuitStore, meterStore } = useStore();
  const { circuitRegistry, circuits, loadCircuitsByMeter } = circuitStore;
  const { selectedMeter } = meterStore;

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    loadCircuitsByMeter(selectedMeter!.id)
      .catch((error) => console.log(JSON.stringify(error)))
      .finally(() => setIsLoading(false));
  }, [circuitRegistry.size]);

  return (
    <>
      <Container className="em-page-header-container">
        <Header as="h2" className="em-page-header">
          Circuits
        </Header>
        <Button
          as={Link}
          to="/circuitsForm/0"
          floated="right"
          color="teal"
          icon="plus"
          content="New Circuit"
        />
      </Container>

      {isLoading ? (
        <LoadingComponent content="Loading circuits..." />
      ) : circuitRegistry.size <= 0 ? (
        <BlankSlate />
      ) : (
        <Table stackable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Installation Date</Table.HeaderCell>
              <Table.HeaderCell textAlign="right">Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {circuits &&
              circuits.map((circuit) => (
                <CircuitListItem key={circuit.id} circuit={circuit} />
              ))}
          </Table.Body>
        </Table>
      )}
    </>
  );
});
