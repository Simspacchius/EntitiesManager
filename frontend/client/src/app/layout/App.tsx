import { Container } from "semantic-ui-react";
import NavBar from "./NavBar";
import { observer } from "mobx-react-lite";
import { Outlet, useLocation, ScrollRestoration } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import { ToastContainer } from "react-toastify";

function App() {
  const location = useLocation();

  return (
    <>
      <ScrollRestoration />
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      {location.pathname === "/" ? (
        <HomePage />
      ) : (
        <>
          <NavBar />
          <Container className="em-main-container">
            <Outlet />
          </Container>
        </>
      )}
    </>
  );
}

export default observer(App);
