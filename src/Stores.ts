import { writable } from "svelte/store";

export const navCheck = writable(false);
export const showing = writable(false);
export const startProjIdx = writable(0);
export const projectDisplay = writable({ "name":"", "time":"", "status":"", "difficulty":"", "description":"", "content": {}, "imgs":["", ""] });
export const showProject = writable(false);
export const imageModalData = writable({ "id": "artPreviewModal", "data": { "path": "", "name": "" } });
export const orientation = writable(0);