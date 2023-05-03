import { schema, rules, CustomMessages } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class MeterUpdateValidator {
  
  constructor(protected ctx: HttpContextContract) {}

  public refs = schema.refs({
		id: this.ctx.params.id
	})

  public schema = schema.create({
    name: schema.string({ trim: true }, [rules.maxLength(200)]),
    serial_number: schema.string({ trim: true }, [
      rules.maxLength(30),
      rules.unique({ table: "meters", column: "serial_number", whereNot: {
        id: this.refs.id,
      }}),
    ]),
    installation_date: schema.date({
      format: "iso",
    }),
  });

  public messages: CustomMessages = {};
}
