import { observer } from "mobx-react-lite";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Header, Table, Button, Container } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import LoadingComponent from "../../app/layout/LoadingComponent";
import SubCircuitListItem from "./SubCircuitListItem";
import BlankSlate from "../../app/common/BlankSlate";

export default observer(function SubCircuitList() {
  const { subCircuitStore, circuitStore } = useStore();
  const { subCircuitRegistry, subCircuits, loadCircuitsByParentCircuit } =
    subCircuitStore;
  const { selectedCircuit } = circuitStore;

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    loadCircuitsByParentCircuit(selectedCircuit!.id)
      .catch((error) => console.log(JSON.stringify(error)))
      .finally(() => setIsLoading(false));
  }, [subCircuitRegistry.size]);

  return (
    <>
      <Container className="em-page-header-container">
        <Header as="h2" className="em-page-header">
          Sub Circuits
        </Header>
        <Button
          as={Link}
          to="/subCircuitsForm/0"
          floated="right"
          color="teal"
          icon="plus"
          content="New Circuit"
        />
      </Container>

      {isLoading ? (
        <LoadingComponent content="Loading sub circuits..." />
      ) : subCircuitRegistry.size <= 0 ? (
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
            {subCircuits &&
              subCircuits.map((subCircuit) => (
                <SubCircuitListItem
                  key={subCircuit.id}
                  subCircuit={subCircuit}
                />
              ))}
          </Table.Body>
        </Table>
      )}
    </>
  );
});
