import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Customer from '../../app/Models/Customer'
import Site from '../../app/Models/Site'
import { faker } from '@faker-js/faker';
import Meter from 'App/Models/Meter';
import { DateTime } from 'luxon';
import Circuit from 'App/Models/Circuit';

export default class extends BaseSeeder {
  public async run () {

    const customerNo = 10;
    const siteNo = 2;
    const meterNo = 2;
    const circuitNo = 3;

    for (let index1 = 0; index1 < customerNo; index1++) {
      
      const customer = await Customer.create({
        name:  faker.name.fullName(),
        email: faker.internet.email(),
        vatNumber: faker.random.alphaNumeric(10)
      });

      for (let index2 = 0; index2 < siteNo; index2++) {
        
        const site = await Site.create({
          name: faker.random.alphaNumeric(20),
          latitude: Number.parseFloat(faker.address.latitude()),
          longitude: Number.parseFloat(faker.address.longitude()),
          address: faker.address.streetAddress(),
          postCode: faker.address.zipCode()
        });

        await customer.related('sites').save(site);

        for (let index3 = 0; index3 < meterNo; index3++) {

          const meter = await Meter.create({
            name: faker.random.alphaNumeric(20),
            serialNumber: faker.random.alphaNumeric(30),
            installationDate: DateTime.fromISO(faker.date.between('2021-01-01T00:00:00.000Z','2021-12-31T00:00:00.000Z').toISOString())
          });

          await site.related('meters').save(meter);

          const mainCircuit = await Circuit.create({
            name: faker.random.alphaNumeric(20),
            isMain: true,
            installationDate: meter.installationDate
          })

          await meter.related('circuits').save(mainCircuit);
          
          for (let index4 = 0; index4 < circuitNo; index4++) {
            const circuit = await Circuit.create({
              name: faker.random.alphaNumeric(20),
              isMain: false,
              installationDate: DateTime.fromISO(faker.date.between('2022-01-01T00:00:00.000Z','2022-12-31T00:00:00.000Z').toISOString())
            })
            
            await meter.related('circuits').save(circuit);

            await mainCircuit.related('circuits').save(circuit);
          }
        }  
      }
    };
  }
}