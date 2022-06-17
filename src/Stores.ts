import { writable } from "svelte/store";

export const navCheck = writable(false);
export const showing = writable(false);
export const projScrollIdx = writable(0);
export const orgScrollIdx = writable(0);
export const artScrollIdx = writable(0);
export const expScrollIdx = writable(0);
export const imageModalData = writable({ "id": "artPreviewModal", "data": { "img": "", "name": "" } });
export const orientation = writable(0);