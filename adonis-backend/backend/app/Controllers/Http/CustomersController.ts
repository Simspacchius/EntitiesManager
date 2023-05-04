import Database from "@ioc:Adonis/Lucid/Database";
import Customer from "App/Models/Customer";
import CustomerCreateValidator from "App/Validators/CustomerCreateValidator";
import CustomerUpdateValidator from "App/Validators/CustomerUpdateValidator";
import UniqueCheckValidator from "App/Validators/UniqueCheckValidator";
import UniqueCheck from "contracts/UniqueCheck";

export default class CustomersController {
  public async index({ response }) {
    const entities = await Customer.all();
    return response.ok(entities);
  }

  public async store({ request, response }) {
    try {
      const payload = await request.validate(CustomerCreateValidator);
      const entity: Customer = await Customer.create({
        name: payload.name,
        email: payload.email,
        vatNumber: payload.vat_number,
      });
      return response.ok(entity);
    } catch (error) {
      response.badRequest(error.messages);
    }
  }

  public async show({ params, response }) {
    const { id }: { id: Number } = params;
    const entity: Customer | null = await Customer.find(id);
    if (!entity) {
      return response.notFound({ message: "Not found" });
    }
    return response.ok(entity);
  }

  public async update({ request, params, response }) {
    const { id }: { id: Number } = params;
    const entity: Customer | null = await Customer.find(id);
    if (!entity) {
      return response.notFound({ message: "Not found" });
    }
    try {
      const payload = await request.validate(CustomerUpdateValidator);
      entity.name = payload.name;
      entity.email = payload.email;
      entity.vatNumber = payload.vat_number;
      await entity.save();
      return response.ok(entity);
    } catch (error) {
      response.badRequest(error.messages);
    }
  }

  public async destroy({ params, response }) {
    const { id }: { id: Number } = params;
    const entity: Customer | null = await Customer.find(id);
    if (!entity) {
      return response.notFound({ message: "Not found" });
    }
    await entity.delete();
    return response.ok({ message: "Deleted successfully." });
  }

  public async checkEmailUnique({ request, response }) {
    try {
      const payload: UniqueCheck = await request.validate(UniqueCheckValidator);
      const customers = await Database.from("customers")
        .where("email", payload.value)
        .whereNot("id", payload.id)
        .count("*", "total");
      const isUnique: boolean = customers[0].total == 0;
      return response.ok(isUnique);
    } catch (error) {
      response.badRequest(error.messages);
    }
  }

  public async checkVatNumberUnique({ request, response }) {
    try {
      const payload: UniqueCheck = await request.validate(UniqueCheckValidator);
      const customers = await Database.from("customers")
        .where("vat_number", payload.value)
        .whereNot("id", payload.id)
        .count("*", "total");
      const isUnique: boolean = customers[0].total == 0;
      return response.ok(isUnique);
    } catch (error) {
      response.badRequest(error.messages);
    }
  }
}
