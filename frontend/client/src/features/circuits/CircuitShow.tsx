import { observer } from "mobx-react-lite";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Header,
  Button,
  Container,
  Breadcrumb,
  Divider,
} from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Circuit } from "../../app/models/circuit";
import CircuitCard from "./CircuitCard";
import MeterCard from "../meters/MeterCard";
import SiteCard from "../sites/SiteCard";
import CustomerCard from "../customers/CustomerCard";
import SubCircuitList from "../subCircuits/SubCircuitList";

export default observer(function CircuitShow() {
  const { circuitStore, meterStore, siteStore, customerStore } = useStore();
  const { selectedCircuit, loadCircuit } = circuitStore;
  const { selectedMeter } = meterStore;
  const { selectedSite } = siteStore;
  const { selectedCustomer } = customerStore;
  const id = parseInt(useParams().id || "");

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    loadCircuit(id)
      .catch((error) => console.log(JSON.stringify(error)))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <Container className="em-page-breadcrumb-container">
        <Breadcrumb>
          <Breadcrumb.Section link as={Link} to="/customers">
            Customers
          </Breadcrumb.Section>
          <Breadcrumb.Divider icon="right arrow" />
          <Breadcrumb.Section
            link
            as={Link}
            to={`/customersShow/${selectedCustomer!.id}`}
          >
            Customer
          </Breadcrumb.Section>
          <Breadcrumb.Divider icon="right arrow" />
          <Breadcrumb.Section
            link
            as={Link}
            to={`/sitesShow/${selectedSite!.id}`}
          >
            Site
          </Breadcrumb.Section>
          <Breadcrumb.Divider icon="right arrow" />
          <Breadcrumb.Section
            link
            as={Link}
            to={`/metersShow/${selectedMeter!.id}`}
          >
            Meter
          </Breadcrumb.Section>
          <Breadcrumb.Divider icon="right arrow" />
          <Breadcrumb.Section active>Circuit</Breadcrumb.Section>
        </Breadcrumb>
      </Container>

      <Container className="em-page-header-container">
        <Header as="h2" className="em-page-header">
          Circuit
        </Header>
        <Button
          as={Link}
          to={`/metersShow/${selectedMeter!.id}`}
          floated="right"
          basic
          color="teal"
          icon="arrow left"
          content="Back"
        />
      </Container>

      {isLoading ? (
        <LoadingComponent content="Loading circuit..." />
      ) : (
        <>
          <Divider className="em-divider" />
          <div className="em-cards-container">
            {selectedCircuit && <CircuitCard circuit={selectedCircuit} />}
            {selectedMeter && <MeterCard meter={selectedMeter} />}
            {selectedSite && <SiteCard site={selectedSite} />}
            {selectedCustomer && <CustomerCard customer={selectedCustomer} />}
          </div>
          <Divider className="em-divider" />
          <Container>
            <SubCircuitList />
          </Container>
        </>
      )}
    </>
  );
});