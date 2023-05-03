import { schema, rules, CustomMessages } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class CustomerUpdateValidator {
  
  constructor(protected ctx: HttpContextContract) {}

  public refs = schema.refs({
		id: this.ctx.params.id
	})

  public schema = schema.create({
    name: schema.string({ trim: true }, [rules.maxLength(200)]),
    email: schema.string({ trim: true }, [
      rules.maxLength(255),
      rules.unique({ table: "customers", column: "email", whereNot: {
        id: this.refs.id,
      }}),
      rules.email(),
    ]),
    vat_number: schema.string({ trim: true }, [
      rules.maxLength(20),
      rules.unique({ table: "customers", column: "vat_number", whereNot: {
        id: this.refs.id,
      }}),
    ]),
  });

  public messages: CustomMessages = {};
}
