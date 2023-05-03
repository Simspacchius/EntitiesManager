import { schema, rules, CustomMessages } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class MeterCreateValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({ trim: true }, [rules.maxLength(200)]),
    serial_number: schema.string({ trim: true }, [
      rules.maxLength(30),
      rules.unique({ table: "meters", column: "serial_number" }),
    ]),
    installation_date: schema.date({
      format: "iso",
    }),
    site_id: schema.number([rules.exists({ table: "sites", column: "id" })]),
  });

  public messages: CustomMessages = {};
}
