import { Writable, writable } from "svelte/store";
import type { Project } from "./LinkProj";

export const showing = writable(true);
export const startProjIdx = writable(0);
export const currentRendered = writable('1');
export const projectDisplay: Writable<Project> = writable({
    "name":"",
    "time":"",
    "status":"",
    "difficulty":"",
    "description":"",
    "takeaways":[
        "",
        ""
    ],
    "imgs":[
        "",
        ""
    ]
});
export const showProject = writable(false);