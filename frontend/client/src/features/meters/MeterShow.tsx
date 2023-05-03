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
import { Meter } from "../../app/models/meter";
import MeterCard from "./MeterCard";
import SiteCard from "../sites/SiteCard"
import CustomerCard from "../customers/CustomerCard"
import EmptyCard from "../../app/layout/EmptyCard"
//import CircuitList from "../circuits/CircuitList";

export default observer(function MeterShow() {
  const { meterStore, siteStore, customerStore } = useStore();
  const { selectedMeter, loadMeter } = meterStore;
  const { selectedSite } = siteStore;
  const { selectedCustomer } = customerStore;
  const id = parseInt(useParams().id || "");

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    loadMeter(id)
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
              <Breadcrumb.Section active>Meter</Breadcrumb.Section>
            </Breadcrumb>
          </Container>

      <Container className="em-page-header-container">
        <Header as="h2" className="em-page-header">
          Meter
        </Header>
        <Button
          as={Link}
          to={`/sitesShow/${selectedSite!.id}`}
          floated="right"
          basic
          color="teal"
          icon="arrow left"
          content="Back"
        />
      </Container>

      {isLoading ? (
        <LoadingComponent content="Loading meter..." />
      ) : (
        <>
          <div className="em-cards-container">
            {selectedMeter && <MeterCard meter={selectedMeter} />}
            {selectedSite && <SiteCard site={selectedSite} />}
            {selectedCustomer && <CustomerCard customer={selectedCustomer} />}
            <EmptyCard/>
          </div>
          <Divider className="em-divider" />
          {/* <Container>
            <CircuitList/>
          </Container> */}
        </>
      )}
    </>
  );
});