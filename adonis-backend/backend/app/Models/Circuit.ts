import { DateTime } from "luxon";
import { BaseModel, column, hasMany, HasMany } from "@ioc:Adonis/Lucid/Orm";

export default class Circuit extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @column()
  public name: string;

  @column.date()
  public installationDate: DateTime;

  @column()
  public isMain: boolean;

  @column()
  public meterId: number;

  @column()
  public parentCircuitId: number;

  @hasMany(() => Circuit, {
    foreignKey: 'parentCircuitId',
  })
  public circuits: HasMany<typeof Circuit>;
}
