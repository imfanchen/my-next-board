import fs from 'fs';
import { Transistor } from '../types/transistor';
import * as data from "../data/transistors.json";

let transistors: Transistor[] = data.map(d => d as Transistor);

export const transistorRepo = {
    getAll,
    getById,
    create,
    update,
    remove
}

function getAll(): Transistor[] {
    return transistors;
}

function getById(id: number): Transistor | undefined {
    return transistors.find(c => c.id === id);
}

function create(transistor: Transistor): Transistor {
    let id = transistors.length + 1;
    transistor.id = id;
    transistors.push(transistor);
    save();
    return transistor;
}

function update(id: number, transistor: Transistor): Transistor {
    let index = transistors.findIndex(c => c.id === id);
    transistors[index] = transistor;
    save();
    return transistor;
}

function remove(id: number): Transistor | undefined {
    let index = transistors.findIndex(c => c.id === id);
    let transistor = transistors[index];
    transistors.splice(index, 1);
    save();
    return transistor;
}

function save() {
    const path = 'data/transistor.json'
    fs.writeFileSync(path, JSON.stringify(transistors));
}