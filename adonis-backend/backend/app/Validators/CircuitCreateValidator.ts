import { schema, rules, CustomMessages } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class CircuitCreateValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({ trim: true }, [rules.maxLength(200)]),
    installation_date: schema.date({
      format: "iso",
    }),
    meter_id: schema.number([rules.exists({ table: "meters", column: "id" })]),
    parent_circuit_id: schema.number.optional([
      rules.exists({
        table: "circuits",
        column: "id",
        whereNot: {
          is_main: false
        },
      }),
    ]),
  });

  public messages: CustomMessages = {};
}
