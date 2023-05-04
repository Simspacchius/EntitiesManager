// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from "@ioc:Adonis/Lucid/Database";
import Meter from "App/Models/Meter";
import MeterCreateValidator from "App/Validators/MeterCreateValidator";
import MeterUpdateValidator from "App/Validators/MeterUpdateValidator";
import UniqueCheckValidator from "App/Validators/UniqueCheckValidator";
import UniqueCheck from "contracts/UniqueCheck";

export default class MetersController {
  public async index({ response }) {
    const entities = await Meter.all();
    return response.ok(entities);
  }

  public async getAllBySiteId({ params, response }) {
    const { siteId }: { siteId: Number } = params;
    const entities = await Database.from("meters").where(
      "site_id",
      siteId.toString()
    );
    return response.ok(entities);
  }

  public async store({ request, response }) {
    try {
      const payload = await request.validate(MeterCreateValidator);
      const entity: Meter = await Meter.create({
        name: payload.name,
        serialNumber: payload.serial_number,
        installationDate: payload.installation_date,
        siteId: payload.site_id,
      });
      return response.ok(entity);
    } catch (error) {
      response.badRequest(error.messages);
    }
  }

  public async show({ params, response }) {
    const { id }: { id: Number } = params;
    const entity: Meter | null = await Meter.find(id);
    if (!entity) {
      return response.notFound({ message: "Not found" });
    }
    return response.ok(entity);
  }

  public async update({ request, params, response }) {
    const { id }: { id: Number } = params;
    const entity: Meter | null = await Meter.find(id);
    if (!entity) {
      return response.notFound({ message: "Not found" });
    }
    try {
      const payload = await request.validate(MeterUpdateValidator);
      entity.name = payload.name;
      entity.serialNumber = payload.serial_number;
      entity.installationDate = payload.installation_date;
      await entity.save();
      return response.ok(entity);
    } catch (error) {
      response.badRequest(error.messages);
    }
  }

  public async destroy({ params, response }) {
    const { id }: { id: Number } = params;
    const entity: Meter | null = await Meter.find(id);
    if (!entity) {
      return response.notFound({ message: "Not found" });
    }
    await entity.delete();
    return response.ok({ message: "Deleted successfully." });
  }

  public async checkSerialNumberUnique({ request, response }) {
    try {
      const payload: UniqueCheck = await request.validate(UniqueCheckValidator);
      console.log(JSON.stringify(payload))
      const meters = await Database.from("meters")
        .where("serial_number", payload.value)
        .whereNot("id", payload.id)
        .count("*", "total");
      const isUnique: boolean = meters[0].total == 0;
      console.log(isUnique);
      return response.ok(isUnique);
    } catch (error) {
      response.badRequest(error.messages);
    }
  }
}
