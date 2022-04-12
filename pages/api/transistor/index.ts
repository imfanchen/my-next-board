import type { NextApiRequest, NextApiResponse } from 'next'
import { Transistor } from '../../../types/transistor'
import { transistorRepo } from '../../../repos/transistor-repo'

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Transistor[]>
) {
    switch (req.method) {
        case 'GET':
            return getTransistors();
        case 'POST':
            return createTransistor();
        default:
            res.setHeader('Allow', ['GET', 'POST'])
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    function getTransistors() {
        const transistors = transistorRepo.getAll();
        return res.status(200).json(transistors);
    }

    function createTransistor() {
        try {
            const transistor = transistorRepo.create(req.body);
            return res.status(200).json([transistor]);
        } catch (error) {
            return res.status(400).end({ message: error });
        }
    }
}
