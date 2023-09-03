import { writable } from "svelte/store";

// Scroll index stores
export const projectScrollIdx = writable(0);
export const organizationScrollIdx = writable(0);
export const artScrollIdx = writable(0);
export const experienceScrollIdx = writable(0);


export const lastOrientSelected = writable(0);
export const orientation = writable(0);

// scroll stores
export const scrollDir = writable(false);
export const allowScroll = writable(true);

// Modal stores
export const showImagePreviewModal = writable(false);
export const imageModalData = writable({ "image": "", "name": "" });