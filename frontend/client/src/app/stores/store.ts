import {createContext, useContext} from "react";
import CommonStore from "./commonStore";
import CustomerStore from "./customerStore";
import SiteStore from "./siteStore";
import MeterStore from "./meterStore";
import CircuitStore from "./circuitStore";
import SubCircuitStore from "./subCircuitStore";

interface Store {
    customerStore: CustomerStore;
    siteStore: SiteStore;
    meterStore: MeterStore;
    circuitStore: CircuitStore;
    subCircuitStore: SubCircuitStore;
    commonStore: CommonStore;
}

export const store: Store = {
    customerStore: new CustomerStore(),
    siteStore: new SiteStore(),
    meterStore: new MeterStore(),
    circuitStore: new CircuitStore(),
    subCircuitStore: new SubCircuitStore(),
    commonStore: new CommonStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}