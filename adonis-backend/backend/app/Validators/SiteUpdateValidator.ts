import { schema, rules, CustomMessages } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class SiteUpdateValidator {
  
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({ trim: true }, [rules.maxLength(200)]),
    longitude: schema.number([rules.range(-180, 180)]),
    latitude: schema.number([rules.range(-90, 90)]),
    address: schema.string({ trim: true }, [rules.maxLength(300)]),
    post_code: schema.string({ trim: true }, [rules.maxLength(10)])
  });

  public messages: CustomMessages = {};
}
