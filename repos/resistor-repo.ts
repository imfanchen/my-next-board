import fs from 'fs';
import { Resistor } from '../types/resistor';
import * as data from "../data/resistors.json";

let resistors: Resistor[] = data.map(d => d as Resistor);

export const resistorRepo = {
    getAll,
    getById,
    create,
    update,
    remove
}

function getAll(): Resistor[] {
    return resistors;
}

function getById(id: number): Resistor | undefined {
    return resistors.find(c => c.id === id);
}

function create(resistor: Resistor): Resistor {
    let id = resistors.length + 1;
    resistor.id = id;
    resistors.push(resistor);
    save();
    return resistor;
}

function update(id: number, resistor: Resistor): Resistor {
    let index = resistors.findIndex(c => c.id === id);
    resistors[index] = resistor;
    save();
    return resistor;
}

function remove(id: number): Resistor | undefined {
    let index = resistors.findIndex(c => c.id === id);
    let resistor = resistors[index];
    resistors.splice(index, 1);
    save();
    return resistor;
}

function save() {
    const path = 'data/resistor.json';
    fs.writeFileSync(path, JSON.stringify(resistors));
}