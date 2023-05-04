import { makeAutoObservable, runInAction } from "mobx";
import { Circuit, CircuitFormValues } from "../models/circuit";
import agent from "../api/agent";

export default class SubCircuitStore {
  subCircuitRegistry = new Map<number, Circuit>();
  selectedSubCircuit?: Circuit = undefined;

  constructor() {
    makeAutoObservable(this);
  }

  get subCircuits() {
    return Array.from(this.subCircuitRegistry.values());
  }

  loadCircuitsByParentCircuit = async (parentCircuitId: number) => {
    try {
      const circuits = await agent.Circuits.listByParentCircuit(
        parentCircuitId
      );
      runInAction(() => {
        this.clearCircuits();
        circuits.forEach((circuit) => {
          this.setCircuit(circuit);
        });
        this.sortCircuits();
      });
    } catch (error) {
      console.log(error);
    }
  };

  loadCircuit = async (id: number) => {
    let circuit = this.getCircuit(id);
    if (circuit) {
      this.selectedSubCircuit = circuit;
      return circuit;
    } else {
      try {
        circuit = await agent.Circuits.details(id);
        if (circuit) {
          runInAction(() => {
            this.setCircuit(circuit!);
            this.sortCircuits();
            this.selectedSubCircuit = circuit;
          });
        }
        return circuit;
      } catch (error) {
        console.log(error);
      }
    }
  };

  createCircuit = async (circuit: CircuitFormValues) => {
    try {
      const newCircuit: Circuit = await agent.Circuits.create(circuit);
      runInAction(() => {
        this.subCircuitRegistry.set(newCircuit.id, newCircuit);
        this.sortCircuits();
        this.selectedSubCircuit = newCircuit;
      });
      return newCircuit.id;
    } catch (error) {
      console.log(error);
    }
  };

  updateCircuit = async (id: number, circuit: CircuitFormValues) => {
    try {
      const updatedCircuit: Circuit = await agent.Circuits.update(id, circuit);
      runInAction(() => {
        this.subCircuitRegistry.set(updatedCircuit.id, updatedCircuit);
        this.sortCircuits();
        this.selectedSubCircuit = updatedCircuit;
      });
    } catch (error) {
      console.log(error);
    }
  };

  deleteCircuit = async (id: number) => {
    try {
      await agent.Circuits.delete(id);
      runInAction(() => {
        this.subCircuitRegistry.delete(id);
        this.sortCircuits();
      });
    } catch (error) {
      console.log(error);
    }
  };

  private setCircuit = (circuit: Circuit) => {
    this.subCircuitRegistry.set(circuit.id, circuit);
  };

  private getCircuit = (id: number) => {
    return this.subCircuitRegistry.get(id);
  };

  private clearCircuits = () => {
    this.subCircuitRegistry.clear();
  };

  private sortCircuits = () => {
    const sortedCircuits = this.subCircuits.sort((a, b) => b.id - a.id);
    this.clearCircuits();
    sortedCircuits.forEach((circuit) => {
      this.setCircuit(circuit);
    });
  };
}
