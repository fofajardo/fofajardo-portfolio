import { writable } from "svelte/store";

let nextFigureNum = 1;
export const figureRecords = writable<Record<string, number>>({});

export function registerFigure(id: string): number {
  let currentNum = 0;
  figureRecords.update((store) => {
    if (id in store) {
      currentNum = store[id];
      return store;
    }
    currentNum = nextFigureNum++;
    return { ...store, [id]: currentNum };
  });
  return currentNum;
}

let nextTableNum = 1;
export const tableRecords = writable<Record<string, number>>({});

export function registerTable(id: string): number {
  let currentNum = 0;
  tableRecords.update((store) => {
    if (id in store) {
      currentNum = store[id];
      return store;
    }
    currentNum = nextTableNum++;
    return { ...store, [id]: currentNum };
  });
  return currentNum;
}

export function resetCounters() {
  nextFigureNum = 1;
  figureRecords.set({});
  nextTableNum = 1;
  tableRecords.set({});
}
