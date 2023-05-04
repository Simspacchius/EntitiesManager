import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Container, Header, Breadcrumb } from "semantic-ui-react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useStore } from "../../app/stores/store";
import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import { CustomerFormValues } from "../../app/models/customer";
import MyTextInput from "../../app/common/form/MyTextInput";
import agent from "../../app/api/agent";

export default observer(function CustomerForm() {
  const { customerStore } = useStore();
  const { createCustomer, updateCustomer, deleteCustomer, loadCustomer } =
    customerStore;
  const id = parseInt(useParams().id || "");
  const navigate = useNavigate();

  const [customerForm, setCustomerForm] = useState<CustomerFormValues>({
    name: "",
    email: "",
    vat_number: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      loadCustomer(id)
        .then((customer) => setCustomerForm(customer!))
        .catch((error) => console.log(JSON.stringify(error)))
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  function handleFormSubmit(
    customerForm: CustomerFormValues,
    formikBag: FormikHelpers<CustomerFormValues>
  ) {
    setIsSaving(true);
    if (id === 0) {
      createCustomer(customerForm)
        .then((newId) => {
          if (newId && newId > 0) navigate(`/customersShow/${newId}`);
        })
        .catch((error) => console.log(JSON.stringify(error)))
        .finally(() => {
          formikBag.setSubmitting(false);
          setIsSaving(false);
        });
    } else {
      updateCustomer(id, customerForm)
        .then(() => navigate("/customers"))
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
    deleteCustomer(id)
      .then(() => navigate("/customers"))
      .catch((error) => console.log(JSON.stringify(error)))
      .finally(() => setIsDeleting(false));
  }

  const validationSchema = Yup.object({
    name: Yup.string()
      .trim()
      .required("Name required")
      .max(200, "Allowed maximum is 200 characters"),
    email: Yup.string()
      .trim()
      .email("Email not valid")
      .required("Email required")
      .max(255, "Allowed maximum is 255 characters")
      .test(
        "customer-unique-email",
        "Email already in use",
        async (value, testContext) =>
          await agent.Customers.checkEmailUnique({
            id: id,
            value: value,
          })
      ),
    vat_number: Yup.string()
      .trim()
      .required("Vat Number required")
      .max(20, "Allowed maximum is 20 characters")
      .test(
        "customer-unique-vat-number",
        "Vat Number already in use",
        async (value, testContext) =>
          await agent.Customers.checkVatNumberUnique({
            id: id,
            value: value,
          })
      ),
  });

  return (
    <>
      {isLoading ? (
        <LoadingComponent content="Loading customer..." />
      ) : (
        <>
          <Container className="em-page-breadcrumb-container">
            <Breadcrumb>
              <Breadcrumb.Section link as={Link} to="/customers">
                Customers
              </Breadcrumb.Section>
              <Breadcrumb.Divider icon="right arrow" />
              <Breadcrumb.Section active>Customer Form</Breadcrumb.Section>
            </Breadcrumb>
          </Container>

          <Container className="em-page-header-container">
            <Header as="h2" className="em-page-header">
              {id === 0 ? "New" : "Edit"} Customer
            </Header>
          </Container>

          <Formik
            enableReinitialize
            validationSchema={validationSchema}
            validateOnChange={false}
            validateOnBlur={true}
            initialValues={customerForm}
            onSubmit={(values, actions) => handleFormSubmit(values, actions)}
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
                  label="Email"
                  name="email"
                  placeholder="Email"
                  type="text"
                />
                <MyTextInput
                  label="Vat Number"
                  name="vat_number"
                  placeholder="Vat Number"
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
                    to="/customers"
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
