import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "customers";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary();
      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
      table.string("name", 200).notNullable();
      table.string("email", 255).unique().notNullable();
      table.string("vat_number", 20).unique().notNullable();
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
