export type Transistor = {
    id: number,
    type: string,
    description?: string,
    current_gain: number,
    collector_emitter_voltage: number,
    emitter_base_voltage: number,
    collector_current: number,
}