import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Site from './Site';

export default class Customer extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @column()
  public name: string;

  @column()
  public email: string;

  @column()
  public vatNumber: string;

  @hasMany(() => Site)
  public sites: HasMany<typeof Site>
}
