import { observer } from "mobx-react-lite";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Header, Table, Button, Container } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import LoadingComponent from "../../app/layout/LoadingComponent";
import SiteListItem from "./SiteListItem";
import BlankSlate from "../../app/common/BlankSlate";

export default observer(function SiteList() {
  const { siteStore, customerStore } = useStore();
  const { siteRegistry, sites, loadSitesByCustomer } = siteStore;
  const { selectedCustomer } = customerStore;

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    loadSitesByCustomer(selectedCustomer!.id)
    .catch((error) => console.log(JSON.stringify(error)))
    .finally(() => setIsLoading(false));
  }, [siteRegistry.size]);

  return (
    <>
      <Container className="em-page-header-container">
        <Header as="h2" className="em-page-header">
          Sites
        </Header>
        <Button
          as={Link}
          to="/sitesForm/0"
          floated="right"
          color="teal"
          icon="plus"
          content="New Site"
        />
      </Container>

      {isLoading ? (
        <LoadingComponent content="Loading sites..." />
      ) : siteRegistry.size <= 0 ? (
        <BlankSlate />
      ) : (
        <Table stackable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Longitude</Table.HeaderCell>
            <Table.HeaderCell>Latitude</Table.HeaderCell>
            <Table.HeaderCell>Address</Table.HeaderCell>
            <Table.HeaderCell>Post Code</Table.HeaderCell>
            <Table.HeaderCell textAlign="right">Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {sites &&
            sites.map((site) => <SiteListItem key={site.id} site={site} />)}
        </Table.Body>
      </Table>
      )}
    </>
  );
});
