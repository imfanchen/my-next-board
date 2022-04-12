import type { NextApiRequest, NextApiResponse } from 'next'
import { Capacitor } from '../../../types/capacitor'
import { capacitorRepo } from '../../../repos/capacitor-repo'

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Capacitor[]>
) {
    switch (req.method) {
        case 'GET':
            return getCapacitors();
        case 'POST':
            return createCapacitor();
        default:
            res.setHeader('Allow', ['GET', 'POST'])
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    function getCapacitors() {
        try {        
            const capacitors = capacitorRepo.getAll();
            return res.status(200).json(capacitors);
        } catch (error) {
            return res.status(400).end({ message: error });
        }
    }

    function createCapacitor() {
        try {
            const capacitor = capacitorRepo.create(req.body);
            return res.status(200).json([capacitor]);
        } catch (error) {
            return res.status(400).end({ message: error });
        }
    }
}
