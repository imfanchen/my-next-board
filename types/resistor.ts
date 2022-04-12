export type Resistor = {
    id: number,
    type: string,
    description?: string,
    tolerance: number,
    stability: number,
    reliability: number,
    voltage_coefficient: number,
    noise: number,
    temperature_rating: number,
    thermal_resistance: number,
    temperature_coefficient_of_resistance: number,
}