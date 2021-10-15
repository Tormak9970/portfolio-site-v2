import { writable } from "svelte/store";

export const showing = writable(false);
export const startProjIdx = writable(0);
export const currentRendered = writable('1');
export const projectDisplay = writable(<Project>{
    "name":"",
    "time":"",
    "status":"",
    "difficulty":"",
    "description":"",
    "content": {

    },
    "imgs":[
        "",
        ""
    ]
});
export const showProject = writable(false);
export const imageModalData = writable({
    "id": "artPreviewModal",
    "data": {
        "path": "", 
        "name": ""
    }
});
export const orientation = writable(0);