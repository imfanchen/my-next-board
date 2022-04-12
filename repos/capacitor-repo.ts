import fs from 'fs';
import { Capacitor } from '../types/capacitor';
import * as data from "../data/capacitors.json";

let capacitors : Capacitor[] =  data.map(d => d as Capacitor);

export const capacitorRepo = {
    getAll,
    getById,
    create,
    update,
    remove
}

function getAll(): Capacitor[] {
    return capacitors;
}

function getById(id: number): Capacitor | undefined {
    return capacitors.find(c => c.id === id);
}

function create(capacitor: Capacitor): Capacitor {
    let id = capacitors.length + 1;
    capacitor.id = id;
    capacitors.push(capacitor);
    save();
    return capacitor;
}

function update(id: number, capacitor: Capacitor): Capacitor {
    let index = capacitors.findIndex(c => c.id === id);
    capacitors[index] = capacitor;
    save();
    return capacitor;
}

function remove(id: number): Capacitor | undefined {
    let index = capacitors.findIndex(c => c.id === id);
    let capacitor = capacitors[index];
    capacitors.splice(index, 1);
    save();
    return capacitor;
}

function save() {
    const path = 'data/capacitors.json';
    fs.writeFileSync(path, JSON.stringify(capacitors));
}