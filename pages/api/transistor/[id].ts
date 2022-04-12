import type { NextApiRequest, NextApiResponse } from 'next'
import { Transistor } from '../../../types/transistor'
import { transistorRepo } from '../../../repos'

export default function transistorHandler(
    req: NextApiRequest,
    res: NextApiResponse<Transistor>) {
    const {
        query: { id },
        method,
    } = req

    switch (method) {
        case 'GET':
            return getTransistorById();
        case 'PUT':
            return updateTransistor();
        case 'DELETE':
            return deleteTransistor();
        default:
            res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }

    function getTransistorById() {
        const transistor = transistorRepo.getById(parseInt(id as string));
        if (transistor) {
            return res.status(200).json(transistor);
        } else {
            return res.status(404).end(`Get failed. Transistor with id ${id} not found`);
        }
    }

    function updateTransistor() {
        const transistor = transistorRepo.update(parseInt(id as string), req.body);
        if (transistor) {
            return res.status(200).json(transistor);
        } else {
            return res.status(400).end(`Update failed. Transistor with id ${id} not found`);
        }
    }

    function deleteTransistor() {
        const transistor = transistorRepo.remove(parseInt(id as string));
        if (transistor) {
            return res.status(200).json(transistor);
        } else {
            return res.status(400).end(`Delete failed. Transistor with id ${id} not found`);
        }
    }
}