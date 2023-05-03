import { schema, rules, CustomMessages } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class CustomerCreateValidator {
  
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({ trim: true }, [rules.maxLength(200)]),
    email: schema.string({ trim: true }, [
      rules.maxLength(255),
      rules.unique({ table: "customers", column: "email"}),
      rules.email(),
    ]),
    vat_number: schema.string({ trim: true }, [
      rules.maxLength(20),
      rules.unique({ table: "customers", column: "vat_number"}),
    ]),
  });

  public messages: CustomMessages = {};
}
