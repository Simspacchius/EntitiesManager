import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import CustomerList from "../../features/customers/CustomerList"
import CustomerShow from "../../features/customers/CustomerShow"
import CustomerForm from "../../features/customers/CustomerForm"
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
            {path: 'errors', element: <TestErrors />},
            {path: 'not-found', element: <NotFound />},
            {path: 'server-error', element: <ServerError />},
            {path: '*', element: <Navigate replace to='/not-found' />},
        ]
    }
]

export const router = createBrowserRouter(routes);