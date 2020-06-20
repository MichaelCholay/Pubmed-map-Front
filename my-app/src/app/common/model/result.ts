export interface Result {
    x: number; // lon
    y: number; // lat
    label: string; // formatted address
    bounds: [
      [number, number], // south, west - lat, lon
      [number, number], // north, east - lat, lon
    ];
    raw: any; // raw provider result
}
