import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Container, Header, Breadcrumb } from "semantic-ui-react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useStore } from "../../app/stores/store";
import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import { CircuitFormValues } from "../../app/models/circuit";
import MyTextInput from "../../app/common/form/MyTextInput";
import MyDateInput from "../../app/common/form/MyDateInput";

export default observer(function CircuitForm() {
  const { circuitStore, meterStore, siteStore, customerStore } = useStore();
  const { createCircuit, updateCircuit, deleteCircuit, loadCircuit } =
    circuitStore;
  const { selectedMeter } = meterStore;
  const { selectedSite } = siteStore;
  const { selectedCustomer } = customerStore;
  const id = parseInt(useParams().id || "");
  const navigate = useNavigate();

  const [circuitForm, setCircuitForm] = useState<CircuitFormValues>({
    name: "",
    installation_date: new Date(),
    meter_id: 0,
    parent_circuit_id: null,
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      loadCircuit(id)
        .then((circuit) => {
          // For Formik to initialize the field properly
          circuit!.installation_date = new Date(circuit!.installation_date);
          setCircuitForm(circuit!);
        })
        .catch((error) => console.log(JSON.stringify(error)))
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  function handleFormSubmit(
    circuitForm: CircuitFormValues,
    formikBag: FormikHelpers<CircuitFormValues>
  ) {
    setIsSaving(true);
    if (id === 0) {
      createCircuit(circuitForm)
        .then((newId) => {
          if (newId && newId > 0) navigate(`/circuitsShow/${newId}`);
        })
        .catch((error) => console.log(JSON.stringify(error)))
        .finally(() => {
          formikBag.setSubmitting(false);
          setIsSaving(false);
        });
    } else {
      updateCircuit(id, circuitForm)
        .then(() => navigate(`/metersShow/${selectedMeter!.id}`))
        .catch((error) => console.log(JSON.stringify(error)))
        .finally(() => {
          formikBag.setSubmitting(false);
          setIsSaving(false);
        });
    }
  }

  function handleDelete(
    id: number,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();
    setIsDeleting(true);
    deleteCircuit(id)
      .then(() => navigate(`/metersShow/${selectedMeter!.id}`))
      .catch((error) => console.log(JSON.stringify(error)))
      .finally(() => setIsDeleting(false));
  }

  const validationSchema = Yup.object({
    name: Yup.string()
      .trim()
      .required("Name required")
      .max(200, "Allowed maximum is 200 characters"),
    installation_date: Yup.date().required("Installation Date required"),
  });

  return (
    <>
      {isLoading ? (
        <LoadingComponent content="Loading circuit..." />
      ) : (
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
              <Breadcrumb.Section active>Circuit Form</Breadcrumb.Section>
            </Breadcrumb>
          </Container>

          <Container className="em-page-header-container">
            <Header as="h2" className="em-page-header">
              {id === 0 ? "New" : "Edit"} Circuit
            </Header>
          </Container>

          <Formik
            enableReinitialize
            validationSchema={validationSchema}
            validateOnChange={false}
            validateOnBlur={true}
            initialValues={circuitForm}
            onSubmit={(values, actions) => {
              values.meter_id = selectedMeter!.id;
              values.parent_circuit_id = null;
              handleFormSubmit(values, actions);
            }}
          >
            {({ handleSubmit, isValid, isSubmitting, dirty }) => (
              <Form
                className="ui form"
                onSubmit={handleSubmit}
                autoComplete="off"
              >
                <MyTextInput
                  label="Name"
                  name="name"
                  placeholder="Name"
                  type="text"
                />
                <MyDateInput
                  name="installation_date"
                  placeholderText="Installation Date"
                  dateFormat="MMMM d, yyyy"
                />
                <Container className="em-buttons-container">
                  <Button
                    type="submit"
                    disabled={isSubmitting || !dirty || !isValid || isDeleting}
                    loading={isSaving}
                    floated="right"
                    color="teal"
                    icon="save"
                    content="Save"
                  />
                  <Button
                    as={Link}
                    to={`/metersShow/${selectedMeter!.id}`}
                    floated="right"
                    basic
                    color="teal"
                    icon="cancel"
                    content="Cancel"
                  />
                  {id > 0 && (
                    <Button
                      onClick={(e) => handleDelete(id, e)}
                      disabled={isSubmitting || isSaving}
                      loading={isDeleting}
                      floated="left"
                      color="red"
                      icon="trash"
                      content="Delete"
                    />
                  )}
                </Container>
              </Form>
            )}
          </Formik>
        </>
      )}
    </>
  );
});
