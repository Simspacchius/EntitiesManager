import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Container, Header, Breadcrumb } from "semantic-ui-react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useStore } from "../../app/stores/store";
import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import { SiteFormValues } from "../../app/models/site";
import MyTextInput from "../../app/common/form/MyTextInput";

export default observer(function SiteForm() {
  const { siteStore, customerStore } = useStore();
  const { createSite, updateSite, deleteSite, loadSite } = siteStore;
  const { selectedCustomer } = customerStore;
  const id = parseInt(useParams().id || "");
  const navigate = useNavigate();
  //const currDate = new Date();

  const [siteForm, setSiteForm] = useState<SiteFormValues>({
    name: "",
    longitude: 0,
    latitude: 0,
    address: "",
    post_code: "",
    customer_id: 0,
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      loadSite(id)
        .then((site) => setSiteForm(site!))
        .catch((error) => console.log(JSON.stringify(error)))
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  function handleFormSubmit(
    id: number,
    siteForm: SiteFormValues,
    formikBag: FormikHelpers<SiteFormValues>
  ) {
    setIsSaving(true);
    if (id === 0) {
      createSite(siteForm)
        .then((newId) => {
          if (newId && newId > 0) navigate(`/sitesShow/${newId}`);
        })
        .catch((error) => console.log(JSON.stringify(error)))
        .finally(() => {
          formikBag.setSubmitting(false);
          setIsSaving(false);
        });
    } else {
      updateSite(id, siteForm)
        .then(() => navigate(`/customersShow/${selectedCustomer!.id}`))
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
    deleteSite(id)
      .then(() => navigate(`/customersShow/${selectedCustomer!.id}`))
      .catch((error) => console.log(JSON.stringify(error)))
      .finally(() => setIsDeleting(false));
  }

  const validationSchema = Yup.object({
    name: Yup.string()
      .trim()
      .required("Name required")
      .max(200, "Allowed maximum is 200 characters"),
    longitude: Yup.number()
      .min(-180, "Minimum at least -180")
      .max(180, "Allowed maximum is 180"),
    latitude: Yup.number()
      .min(-90, "Minimum at least -90")
      .max(90, "Allowed maximum is 90"),
    address: Yup.string()
      .trim()
      .required("Address required")
      .max(300, "Allowed maximum is 300 characters"),
    post_code: Yup.string()
      .trim()
      .required("Post Code required")
      .max(10, "Allowed maximum is 10 characters"),
  });

  return (
    <>
      {isLoading ? (
        <LoadingComponent content="Loading site..." />
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
              <Breadcrumb.Section active>Site Form</Breadcrumb.Section>
            </Breadcrumb>
          </Container>

          <Container className="em-page-header-container">
            <Header as="h2" className="em-page-header">
              {id === 0 ? "New" : "Edit"} Site
            </Header>
          </Container>

          <Formik
            enableReinitialize
            validationSchema={validationSchema}
            initialValues={siteForm}
            onSubmit={(values, actions) => {
              values.customer_id = selectedCustomer!.id;
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
                  label="Longitude"
                  name="longitude"
                  placeholder="Longitude"
                  type="number"
                />
                <MyTextInput
                  label="Latitude"
                  name="latitude"
                  placeholder="Latitude"
                  type="number"
                />
                <MyTextInput
                  label="Address"
                  name="address"
                  placeholder="Address"
                  type="text"
                />
                <MyTextInput
                  label="Post Code"
                  name="post_code"
                  placeholder="Post Code"
                  type="text"
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
                    to={`/customersShow/${selectedCustomer!.id}`}
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
