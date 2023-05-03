import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'sites'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary();
      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
      table.string("name", 200).notNullable();
      table.float("longitude",12,9).notNullable();
      table.float("latitude",12,9).notNullable();
      table.string("address", 300).notNullable();
      table.string("post_code", 10).notNullable();
      table.integer('customer_id').references('id').inTable('customers').onDelete('CASCADE');
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
