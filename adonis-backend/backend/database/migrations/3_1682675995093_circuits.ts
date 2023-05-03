import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'circuits'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary();
      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
      table.string("name", 200).notNullable();
      table.date("installation_date").notNullable();
      table.boolean("is_main").notNullable();
      table.integer('meter_id').references('id').inTable('meters').onDelete('CASCADE');
      table.integer('parent_circuit_id').references('id').inTable('circuits').onDelete('CASCADE');
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
