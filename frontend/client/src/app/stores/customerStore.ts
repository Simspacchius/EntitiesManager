import { makeAutoObservable, runInAction } from "mobx";
import { Customer, CustomerFormValues } from "../models/customer";
import agent from "../api/agent";

export default class CustomerStore {
  customerRegistry = new Map<number, Customer>();
  selectedCustomer?: Customer = undefined;

  constructor() {
    makeAutoObservable(this);
  }

  get customers() {
    return Array.from(this.customerRegistry.values());
  }

  loadCustomers = async () => {
    try {
      const customers = await agent.Customers.list();
      runInAction(() => {
        customers.forEach((customer) => {
          this.setCustomer(customer);
        });
        this.sortCustomers();
      });
    } catch (error) {
      console.log(error);
    }
  };

  loadCustomer = async (id: number) => {
    let customer = this.getCustomer(id);
    if (customer) {
      this.selectedCustomer = customer;
      return customer;
    } else {
      try {
        customer = await agent.Customers.details(id);
        if (customer) {
          runInAction(() => {
            this.setCustomer(customer!);
            this.sortCustomers();
            this.selectedCustomer = customer;
          });
        }
        return customer;
      } catch (error) {
        console.log(error);
      }
    }
  };

  createCustomer = async (customer: CustomerFormValues) => {
    try {
      const newCustomer: Customer = await agent.Customers.create(customer);
      runInAction(() => {
        this.customerRegistry.set(newCustomer.id, newCustomer);
        this.sortCustomers();
        this.selectedCustomer = newCustomer;
      });
      return newCustomer.id;
    } catch (error) {
       console.log(error);
    }
  };

  updateCustomer = async (id: number, customer: CustomerFormValues) => {
    try {
      const updatedCustomer: Customer = await agent.Customers.update(
        id,
        customer
      );
      runInAction(() => {
        this.customerRegistry.set(updatedCustomer.id, updatedCustomer);
        this.sortCustomers();
        this.selectedCustomer = updatedCustomer;
      });
    } catch (error) {
      console.log(error);
    }
  };

  deleteCustomer = async (id: number) => {
    try {
      await agent.Customers.delete(id);
      runInAction(() => {
        this.customerRegistry.delete(id);
        this.sortCustomers();
      });
    } catch (error) {
      console.log(error);
    }
  };

  private setCustomer = (customer: Customer) => {
    this.customerRegistry.set(customer.id, customer);
  };

  private getCustomer = (id: number) => {
    return this.customerRegistry.get(id);
  };

  private sortCustomers = () => {
    const sortedCustomers = this.customers.sort((a, b) => b.id - a.id);
    sortedCustomers.forEach((customer) => {
      this.setCustomer(customer);
    });
  };
}
