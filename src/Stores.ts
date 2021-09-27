import { writable } from "svelte/store";

export const showing = writable(true);
export const startProjIdx = writable(0);
export const currentRendered = writable('1');