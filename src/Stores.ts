import { writable } from "svelte/store";

export const navCheck = writable(false);
export const showing = writable(false);
export const projScrollIdx = writable(0);
export const orgScrollIdx = writable(0);
export const artScrollIdx = writable(0);
export const expScrollIdx = writable(0);
export const imageModalData = writable({ "id": "artPreviewModal", "data": { "image": "", "name": "" } });
export const lastOrientSelected = writable(0);
export const orientation = writable(0);

// scroll stores
export const scrollDir = writable(false);
export const allowScroll = writable(true);