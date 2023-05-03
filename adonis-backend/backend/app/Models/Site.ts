import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Meter from './Meter';

export default class Site extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @column()
  public name: string;

  @column()
  public longitude: number;

  @column()
  public latitude: number;

  @column()
  public address: string;

  @column()
  public postCode: string;

  @column()
  public customerId: number;

  @hasMany(() => Meter)
  public meters: HasMany<typeof Meter>
}
