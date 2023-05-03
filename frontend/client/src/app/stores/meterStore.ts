import { makeAutoObservable, runInAction } from "mobx";
import { Meter, MeterFormValues } from "../models/meter";
import agent from "../api/agent";

export default class MeterStore {
  meterRegistry = new Map<number, Meter>();
  selectedMeter?: Meter = undefined;

  constructor() {
    makeAutoObservable(this);
  }

  get meters() {
    return Array.from(this.meterRegistry.values());
  }

  loadMeters = async (parentId: number) => {
    try {
      const meters = await agent.Meters.list(parentId);
      runInAction(() => {
        meters.forEach((meter) => {
          this.setMeter(meter);
        });
        this.sortMeters();
      });
    } catch (error) {
      console.log(error);
    }
  };

  loadMeter = async (id: number) => {
    let meter = this.getMeter(id);
    if (meter) {
      this.selectedMeter = meter;
      return meter;
    } else {
      try {
        meter = await agent.Meters.details(id);
        if (meter) {
          runInAction(() => {
            this.setMeter(meter!);
            this.sortMeters();
            this.selectedMeter = meter;
          });
        }
        return meter;
      } catch (error) {
        console.log(error);
      }
    }
  };

  createMeter = async (meter: MeterFormValues) => {
    try {
      const newMeter: Meter = await agent.Meters.create(meter);
      runInAction(() => {
        this.meterRegistry.set(newMeter.id, newMeter);
        this.sortMeters();
        this.selectedMeter = newMeter;
      });
      return newMeter.id;
    } catch (error) {
       console.log(error);
    }
  };

  updateMeter = async (id: number, meter: MeterFormValues) => {
    try {
      const updatedMeter: Meter = await agent.Meters.update(
        id,
        meter
      );
      runInAction(() => {
        this.meterRegistry.set(updatedMeter.id, updatedMeter);
        this.sortMeters();
        this.selectedMeter = updatedMeter;
      });
    } catch (error) {
      console.log(error);
    }
  };

  deleteMeter = async (id: number) => {
    try {
      await agent.Meters.delete(id);
      runInAction(() => {
        this.meterRegistry.delete(id);
        this.sortMeters();
      });
    } catch (error) {
      console.log(error);
    }
  };

  private setMeter = (meter: Meter) => {
    this.meterRegistry.set(meter.id, meter);
  };

  private getMeter = (id: number) => {
    return this.meterRegistry.get(id);
  };

  private sortMeters = () => {
    const sortedMeters = this.meters.sort((a, b) => b.id - a.id);
    sortedMeters.forEach((meter) => {
      this.setMeter(meter);
    });
  };
}