import { makeAutoObservable, runInAction } from "mobx";
import { Circuit, CircuitFormValues } from "../models/circuit";
import agent from "../api/agent";

export default class CircuitStore {
  circuitRegistry = new Map<number, Circuit>();
  selectedCircuit?: Circuit = undefined;

  constructor() {
    makeAutoObservable(this);
  }

  get circuits() {
    return Array.from(this.circuitRegistry.values());
  }

  loadCircuitsByMeter = async (meterId: number) => {
    try {
      const circuits = await agent.Circuits.listByMeter(meterId);
      runInAction(() => {
        circuits.forEach((circuit) => {
          this.setCircuit(circuit);
        });
        this.sortCircuits();
      });
    } catch (error) {
      console.log(error);
    }
  };

  loadCircuitsByParentCircuit = async (parentCircuitId: number) => {
    try {
      const circuits = await agent.Circuits.listByParentCircuit(parentCircuitId);
      runInAction(() => {
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
      this.selectedCircuit = circuit;
      return circuit;
    } else {
      try {
        circuit = await agent.Circuits.details(id);
        if (circuit) {
          runInAction(() => {
            this.setCircuit(circuit!);
            this.sortCircuits();
            this.selectedCircuit = circuit;
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
        this.circuitRegistry.set(newCircuit.id, newCircuit);
        this.sortCircuits();
        this.selectedCircuit = newCircuit;
      });
      return newCircuit.id;
    } catch (error) {
       console.log(error);
    }
  };

  updateCircuit = async (id: number, circuit: CircuitFormValues) => {
    try {
      const updatedCircuit: Circuit = await agent.Circuits.update(
        id,
        circuit
      );
      runInAction(() => {
        this.circuitRegistry.set(updatedCircuit.id, updatedCircuit);
        this.sortCircuits();
        this.selectedCircuit = updatedCircuit;
      });
    } catch (error) {
      console.log(error);
    }
  };

  deleteCircuit = async (id: number) => {
    try {
      await agent.Circuits.delete(id);
      runInAction(() => {
        this.circuitRegistry.delete(id);
        this.sortCircuits();
      });
    } catch (error) {
      console.log(error);
    }
  };

  private setCircuit = (circuit: Circuit) => {
    this.circuitRegistry.set(circuit.id, circuit);
  };

  private getCircuit = (id: number) => {
    return this.circuitRegistry.get(id);
  };

  private sortCircuits = () => {
    const sortedCircuits = this.circuits.sort((a, b) => b.id - a.id);
    sortedCircuits.forEach((circuit) => {
      this.setCircuit(circuit);
    });
  };
}