import { schema, rules, CustomMessages } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class SiteCreateValidator {
  
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({ trim: true }, [rules.maxLength(200)]),
    longitude: schema.number([rules.range(-180, 180)]),
    latitude: schema.number([rules.range(-90, 90)]),
    address: schema.string({ trim: true }, [rules.maxLength(300)]),
    post_code: schema.string({ trim: true }, [rules.maxLength(10)]),
    customer_id: schema.number([
      rules.exists({ table: "customers", column: "id" }),
    ])
  });

  public messages: CustomMessages = {};
}
