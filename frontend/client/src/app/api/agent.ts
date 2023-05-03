import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { Customer, CustomerFormValues } from '../models/customer';
import { Site, SiteFormValues } from '../models/site';
import { Meter, MeterFormValues } from '../models/meter';
import { Circuit, CircuitFormValues } from '../models/circuit';
import { router } from '../router/Routes';
import { store } from '../stores/store';

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    })
}

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

axios.interceptors.response.use(async response => {
    // This is done on purpose to test the loading spinner
    await sleep(1000);
    return response;
}, (error: AxiosError) => {
    const {data, status, config} = error.response as AxiosResponse;
    switch (status) {
        case 400:
            if (config.method === 'get' && data.errors.hasOwnProperty('id')) {
                router.navigate('/not-found');
            }
            if (data.errors) {
                const modalStateErrors = [];
                for (const key in data.errors) {
                    if (data.errors[key]) {
                        modalStateErrors.push(data.errors[key])
                    }
                }
                throw modalStateErrors.flat();
            } else {
                toast.error(data);
            }
            break;
        case 401: 
            toast.error('unauthorised')
            break;
        case 403:
            toast.error('forbidden')
            break;
        case 404:
            router.navigate('/not-found');
            break;
        case 500:
            store.commonStore.setServerError(data);
            router.navigate('/server-error');
            break;
    }
    return Promise.reject(error);
})

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responseBody)
}

const Customers = {
    list: () => requests.get<Customer[]>('/customers'),
    details: (id: number) => requests.get<Customer>(`/customers/${id}`),
    create: (customer: CustomerFormValues) => requests.post<Customer>('/customers', customer),
    update: (id: number, customer: CustomerFormValues) => requests.put<Customer>(`/customers/${id}`, customer),
    delete: (id: number) => axios.delete(`/customers/${id}`)
}

const Sites = {
    list: (parentId: number) => requests.get<Site[]>(`/sites/${parentId}`),
    details: (id: number) => requests.get<Site>(`/sites/${id}`),
    create: (site: SiteFormValues) => requests.post<Site>('/sites', site),
    update: (id: number, site: SiteFormValues) => requests.put<Site>(`/sites/${id}`, site),
    delete: (id: number) => axios.delete(`/sites/${id}`)
}

const Meters = {
    list: (parentId: number) => requests.get<Meter[]>(`/meters/${parentId}`),
    details: (id: number) => requests.get<Meter>(`/meters/${id}`),
    create: (meter: MeterFormValues) => requests.post<Meter>('/meters', meter),
    update: (id: number, meter: MeterFormValues) => requests.put<Meter>(`/meters/${id}`, meter),
    delete: (id: number) => axios.delete(`/meters/${id}`)
}

const Circuits = {
    list: (parentId: number) => requests.get<Circuit[]>(`/circuits/${parentId}`),
    details: (id: number) => requests.get<Circuit>(`/circuits/${id}`),
    create: (circuit: CircuitFormValues) => requests.post<Circuit>('/circuits', circuit),
    update: (id: number, circuit: CircuitFormValues) => requests.put<Circuit>(`/circuits/${id}`, circuit),
    delete: (id: number) => axios.delete(`/circuits/${id}`)
}

const agent = {
    Customers,
    Sites,
    Meters,
    Circuits
}

export default agent;