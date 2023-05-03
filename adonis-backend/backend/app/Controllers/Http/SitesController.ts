// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from "@ioc:Adonis/Lucid/Database";
import Site from "App/Models/Site";
import SiteCreateValidator from "App/Validators/SiteCreateValidator";
import SiteUpdateValidator from "App/Validators/SiteUpdateValidator";

export default class SitesController {
  public async index({ response }) {
    const entities = await Site.all();
    return response.ok(entities);
  }

  public async getAllByCustomerId({ params, response }) {
    const { customerId }: { customerId: Number } = params;
    const entities = await Database.from("sites").where(
      "customer_id",
      customerId.toString()
    );
    return response.ok(entities);
  }
  
  public async store({ request, response }) {
    try {
      const payload = await request.validate(SiteCreateValidator);
      const entity: Site = await Site.create({
        name: payload.name,
        longitude: payload.longitude,
        latitude: payload.latitude,
        address: payload.address,
        postCode: payload.post_code,
        customerId: payload.customer_id,
      });
      return response.ok(entity);
    } catch (error) {
      response.badRequest(error.messages);
    }
  }

  public async show({ params, response }) {
    const { id }: { id: Number } = params;
    const entity: Site | null = await Site.find(id);
    if (!entity) {
      return response.notFound({ message: "Not found" });
    }
    return response.ok(entity);
  }

  public async update({ request, params, response }) {
    const { id }: { id: Number } = params;
    const entity: Site | null = await Site.find(id);
    if (!entity) {
      return response.notFound({ message: "Not found" });
    }
    try {
      const payload = await request.validate(SiteUpdateValidator);
      entity.name = payload.name;
      entity.longitude = payload.longitude;
      entity.latitude = payload.latitude;
      entity.address = payload.address;
      entity.postCode = payload.post_code;
      await entity.save();
      return response.ok(entity);
    } catch (error) {
      response.badRequest(error.messages);
    }
  }

  public async destroy({ params, response }) {
    const { id }: { id: Number } = params;
    const entity: Site | null = await Site.find(id);
    if (!entity) {
      return response.notFound({ message: "Not found" });
    }
    await entity.delete();
    return response.ok({ message: "Deleted successfully." });
  }
}
