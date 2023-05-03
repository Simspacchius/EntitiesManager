import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'meters'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary();
      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
      table.string("name", 200).notNullable();
      table.string("serial_number", 30).notNullable().unique();
      table.date("installation_date").notNullable();
      table.integer('site_id').references('id').inTable('sites').onDelete('CASCADE');
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
