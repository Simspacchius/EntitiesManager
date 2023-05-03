// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from "@ioc:Adonis/Lucid/Database"
import Circuit from "App/Models/Circuit"
import CircuitCreateValidator from 'App/Validators/CircuitCreateValidator'
import CircuitUpdateValidator from 'App/Validators/CircuitUpdateValidator'

export default class CircuitsController {

    public async index({ response }) {
        const entities = await Circuit.all()
        return response.ok(entities)
    }

    public async getAllByMeterId({ params, response }) {
        const { meterId }: { meterId: Number } = params
        const entities = await Database.from('circuits').where('meter_id', meterId.toString())
        return response.ok(entities)
    }

    public async getAllByParentCircuitId({ params, response }) {
        const { parentCircuitId }: { parentCircuitId: Number } = params
        const entities = await Database.from('circuits').where('parent_circuit_id', parentCircuitId.toString())
        return response.ok(entities)
    }

    public async store({ request, response }) {
        try {
            const payload = await request.validate(CircuitCreateValidator)
            const entity: Circuit = await Circuit.create({
                name: payload.name,
                installationDate: payload.installation_date,
                // circuit is main if it doesn't have a parent circuit set
                isMain: !payload.parent_circuit_id,
                meterId: payload.meter_id,
                parentCircuitId: payload.parent_circuit_id
            })
            return response.ok(entity)
          } catch (error) {
            response.badRequest(error.messages)
          }
    }

    public async show({ params, response }) {
        const { id }: { id: Number } = params
        const entity: Circuit | null = await Circuit.find(id)
        if (!entity) {
            return response.notFound({ message: 'Not found' })
        }
        return response.ok(entity)
    }

    public async update({ request, params, response }) {
        const { id }: { id: Number } = params
        const entity: Circuit | null = await Circuit.find(id)
        if (!entity) {
            return response.notFound({ message: 'Not found' })
        }
        try {
            const payload = await request.validate(CircuitUpdateValidator)
            entity.name = payload.name
            entity.installationDate = payload.installation_date
            await entity.save()
            return response.ok(entity)
          } catch (error) {
            response.badRequest(error.messages)
          }
    }

    public async destroy({ params, response }) {
        const { id }: { id: Number } = params
        const entity: Circuit | null = await Circuit.find(id)
        if (!entity) {
            return response.notFound({ message: 'Not found' })
        }
        await entity.delete()
        return response.ok({ message: 'Deleted successfully.' })
    }
}