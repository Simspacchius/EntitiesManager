import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Circuit from './Circuit';

export default class Meter extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @column()
  public name: string;

  @column()
  public serialNumber: string;

  @column.date()
  public installationDate: DateTime;

  @column()
  public siteId: number;

  @hasMany(() => Circuit)
  public circuits: HasMany<typeof Circuit>
}
