import type { NextApiRequest, NextApiResponse } from 'next'
import { Resistor } from '../../../types/resistor'
import { resistorRepo } from '../../../repos/resistor-repo'

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Resistor[]>
) {
    switch (req.method) {
        case 'GET':
            return getResistors();
        case 'POST':
            return createResistor();
        default:
            res.setHeader('Allow', ['GET', 'POST'])
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    function getResistors() {
        const resistors = resistorRepo.getAll();
        return res.status(200).json(resistors);
    }

    function createResistor() {
        try {
            const resistor = resistorRepo.create(req.body);
            return res.status(200).json([resistor]);
        } catch (error) {
            return res.status(400).end({ message: error });
        }
    }
}
