import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Container, Header, Breadcrumb } from "semantic-ui-react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useStore } from "../../app/stores/store";
import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import { MeterFormValues } from "../../app/models/meter";
import MyTextInput from "../../app/common/form/MyTextInput";
import MyDateInput from "../../app/common/form/MyDateInput";

export default observer(function MeterForm() {
  const { meterStore, siteStore, customerStore } = useStore();
  const { createMeter, updateMeter, deleteMeter, loadMeter } = meterStore;
  const { selectedSite } = siteStore;
  const { selectedCustomer } = customerStore;
  const id = parseInt(useParams().id || "");
  const navigate = useNavigate();

  const [meterForm, setMeterForm] = useState<MeterFormValues>({
    name: "",
    serial_number: "",
    installation_date: new Date(),
    site_id: 0,
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      loadMeter(id)
        .then((meter) => {
            meter!.installation_date = new Date(meter!.installation_date);
            setMeterForm(meter!)  
        })
        .catch((error) => console.log(JSON.stringify(error)))
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  function handleFormSubmit(
    id: number,
    meterForm: MeterFormValues,
    formikBag: FormikHelpers<MeterFormValues>
  ) {
    setIsSaving(true);
    if (id === 0) {
      createMeter(meterForm)
        .then((newId) => {
          if (newId && newId > 0) navigate(`/metersShow/${newId}`);
        })
        .catch((error) => console.log(JSON.stringify(error)))
        .finally(() => {
          formikBag.setSubmitting(false);
          setIsSaving(false);
        });
    } else {
      updateMeter(id, meterForm)
        .then(() => navigate(`/sitesShow/${selectedSite!.id}`))
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
    deleteMeter(id)
      .then(() => navigate(`/sitesShow/${selectedSite!.id}`))
      .catch((error) => console.log(JSON.stringify(error)))
      .finally(() => setIsDeleting(false));
  }

  const validationSchema = Yup.object({
    name: Yup.string()
      .trim()
      .required("Name required")
      .max(200, "Allowed maximum is 200 characters"),
    serial_number: Yup.string()
      .trim()
      .required("Serial Number required")
      .max(30, "Allowed maximum is 30 characters"),
    installation_date: Yup.date().required("Installation Date required"),
  });

  return (
    <>
      {isLoading ? (
        <LoadingComponent content="Loading meter..." />
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
              <Breadcrumb.Section active>Meter Form</Breadcrumb.Section>
            </Breadcrumb>
          </Container>

          <Container className="em-page-header-container">
            <Header as="h2" className="em-page-header">
              {id === 0 ? "New" : "Edit"} Meter
            </Header>
          </Container>

          <Formik
            enableReinitialize
            validationSchema={validationSchema}
            initialValues={meterForm}
            onSubmit={(values, actions) => {
              values.site_id = selectedSite!.id;
              handleFormSubmit(id, values, actions);
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
                <MyTextInput
                  label="Serial Number"
                  name="serial_number"
                  placeholder="Serial Number"
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
                    to={`/sitesShow/${selectedSite!.id}`}
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
