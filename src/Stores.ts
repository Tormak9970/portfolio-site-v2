import { Writable, writable } from "svelte/store";

export const showing = writable(false);
export const startProjIdx = writable(0);
export const currentRendered = writable('1');
export const projectDisplay: Writable<Project> = writable({
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