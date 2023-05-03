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
import { Site } from "../../app/models/site";
import SiteCard from "./SiteCard";
import CustomerCard from "../customers/CustomerCard"
import EmptyCard from "../../app/layout/EmptyCard"
import SiteList from "../sites/SiteList";

export default observer(function SiteShow() {
  const { siteStore, customerStore } = useStore();
  const { selectedSite, loadSite } = siteStore;
  const { selectedCustomer } = customerStore;
  const id = parseInt(useParams().id || "");

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    loadSite(id)
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
              <Breadcrumb.Section active>Site</Breadcrumb.Section>
            </Breadcrumb>
          </Container>

      <Container className="em-page-header-container">
        <Header as="h2" className="em-page-header">
          Site
        </Header>
        <Button
          as={Link}
          to={`/customersShow/${selectedCustomer!.id}`}
          floated="right"
          basic
          color="teal"
          icon="arrow left"
          content="Back"
        />
      </Container>

      {isLoading ? (
        <LoadingComponent content="Loading site..." />
      ) : (
        <>
          <div className="em-cards-container">
            {selectedSite && <SiteCard site={selectedSite} />}
            {selectedCustomer && <CustomerCard customer={selectedCustomer} />}
            <EmptyCard/>
          </div>
          <Divider className="em-divider" />
          {/* <Container>
            <SiteList></SiteList>
          </Container> */}
        </>
      )}
    </>
  );
});