import type { NextApiRequest, NextApiResponse } from 'next'
import { Resistor } from '../../../types/resistor'
import { resistorRepo } from '../../../repos'

export default function resistorHandler(
    req: NextApiRequest,
    res: NextApiResponse<Resistor>) {
    const {
        query: { id },
        method,
    } = req

    switch (method) {
        case 'GET':
            return getResistorById();
        case 'PUT':
            return updateResistor();
        case 'DELETE':
            return deleteResistor();
        default:
            res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }

    function getResistorById() {
        const resistor = resistorRepo.getById(parseInt(id as string));
        if (resistor) {
            return res.status(200).json(resistor);
        } else {
            return res.status(404).end(`Get failed. Resistor with id ${id} not found`);
        }
    }

    function updateResistor() {
        const resistor = resistorRepo.update(parseInt(id as string), req.body);
        if (resistor) {
            return res.status(200).json(resistor);
        } else {
            return res.status(400).end(`Update failed. Resistor with id ${id} not found`);
        }
    }

    function deleteResistor() {
        const resistor = resistorRepo.remove(parseInt(id as string));
        if (resistor) {
            return res.status(200).json(resistor);
        } else {
            return res.status(400).end(`Delete failed. Resistor with id ${id} not found`);
        }
    }
}