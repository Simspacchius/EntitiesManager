// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Meter from "App/Models/Meter"
import MeterCreateValidator from 'App/Validators/MeterCreateValidator'
import MeterUpdateValidator from 'App/Validators/MeterUpdateValidator'

export default class MetersController {

    public async index({ response }) {
        const entities = await Meter.all()
        return response.ok(entities)
    }

    public async store({ request, response }) {
        try {
            const payload = await request.validate(MeterCreateValidator)
            const entity: Meter = await Meter.create({
                name: payload.name,
                serialNumber: payload.serial_number,
                installationDate: payload.installation_date,
                siteId: payload.site_id
            })
            return response.ok(entity)
          } catch (error) {
            response.badRequest(error.messages)
          }
    }

    public async show({ params, response }) {
        const { id }: { id: Number } = params
        const entity: Meter | null = await Meter.find(id)
        if (!entity) {
            return response.notFound({ message: 'Not found' })
        }
        return response.ok(entity)
    }

    public async update({ request, params, response }) {
        const { id }: { id: Number } = params
        const entity: Meter | null = await Meter.find(id)
        if (!entity) {
            return response.notFound({ message: 'Not found' })
        }
        try {
            const payload = await request.validate(MeterUpdateValidator)
            entity.name = payload.name
            entity.serialNumber = payload.serial_number
            entity.installationDate = payload.installation_date
            await entity.save()
            return response.ok(entity)
          } catch (error) {
            response.badRequest(error.messages)
          }
    }

    public async destroy({ params, response }) {
        const { id }: { id: Number } = params
        const entity: Meter | null = await Meter.find(id)
        if (!entity) {
            return response.notFound({ message: 'Not found' })
        }
        await entity.delete()
        return response.ok({ message: 'Deleted successfully.' })
    }
}