declare module "@mapbox/polyline" {
  export function decode(encoded: string): number[][];
  export function encode(coords: number[][]): string;
}
