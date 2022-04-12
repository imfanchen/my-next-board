import type { NextApiRequest, NextApiResponse } from 'next'
import { Capacitor } from '../../../types/capacitor'
import { capacitorRepo } from '../../../repos'

export default function capacitorHandler(
    req: NextApiRequest,
    res: NextApiResponse<Capacitor>) {
    const {
        query: { id },
        method,
    } = req

    switch (method) {
        case 'GET':
            return getCapacitorById();
        case 'PUT':
            return updateCapacitor();
        case 'DELETE':
            return deleteCapacitor();
        default:
            res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }

    function getCapacitorById() {
        const capacitor = capacitorRepo.getById(parseInt(id as string));
        if (capacitor) {
            return res.status(200).json(capacitor);
        } else {
            return res.status(404).end(`Get failed. Capacitor with id ${id} not found`);
        }
    }

    function updateCapacitor() {
        const capacitor = capacitorRepo.update(parseInt(id as string), req.body);
        if (capacitor) {
            return res.status(200).json(capacitor);
        } else {
            return res.status(400).end(`Update failed. Capacitor with id ${id} not found`);
        }
    }

    function deleteCapacitor() {
        const capacitor = capacitorRepo.remove(parseInt(id as string));
        if (capacitor) {
            return res.status(200).json(capacitor);
        } else {
            return res.status(400).end(`Delete failed. Capacitor with id ${id} not found`);
        }
    }
}