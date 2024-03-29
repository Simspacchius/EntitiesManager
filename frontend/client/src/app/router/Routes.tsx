import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import CustomerList from "../../features/customers/CustomerList"
import CustomerShow from "../../features/customers/CustomerShow"
import CustomerForm from "../../features/customers/CustomerForm"
import SiteShow from "../../features/sites/SiteShow"
import SiteForm from "../../features/sites/SiteForm"
import MeterShow from "../../features/meters/MeterShow"
import MeterForm from "../../features/meters/MeterForm"
import CircuitShow from "../../features/circuits/CircuitShow"
import CircuitForm from "../../features/circuits/CircuitForm"
import SubCircuitForm from "../../features/subCircuits/SubCircuitForm"
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";
import TestErrors from "../../features/errors/TestError";
import App from "../layout/App";

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
            {path: 'customers', element: <CustomerList />},
            {path: 'customersShow/:id', element: <CustomerShow />},
            {path: 'customersForm/:id', element: <CustomerForm />},
            {path: 'sitesShow/:id', element: <SiteShow />},
            {path: 'sitesForm/:id', element: <SiteForm />},
            {path: 'metersShow/:id', element: <MeterShow />},
            {path: 'metersForm/:id', element: <MeterForm />},
            {path: 'circuitsShow/:id', element: <CircuitShow />},
            {path: 'circuitsForm/:id', element: <CircuitForm />},
            {path: 'subCircuitsForm/:id', element: <SubCircuitForm />},
            {path: 'errors', element: <TestErrors />},
            {path: 'not-found', element: <NotFound />},
            {path: 'server-error', element: <ServerError />},
            {path: '*', element: <Navigate replace to='/not-found' />},
        ]
    }
]

export const router = createBrowserRouter(routes);