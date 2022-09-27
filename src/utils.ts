import { circInOut } from "svelte/easing";
import type { FlyParams } from "svelte/transition";

export function getTransitions(dir:boolean): {[key:string]:FlyParams} {
    return dir ? {
        "in": {
            y: 400,
            delay: 200,
            duration: 1000
        },
        "out": {
            y: -400,
            duration: 1000
        }
    } : {
        "in": {
            y: -400,
            delay: 200,
            duration: 1000
        },
        "out": {
            y: 400,
            duration: 1000
        }
    };
}

export function throttle(func:any, wait:number) {
    let waiting = false;
    return function () {
      if (waiting) {
        return;
      } else {
        func.apply(this, arguments);
      }
  
      waiting = true;
      setTimeout(() => {
        waiting = false;
      }, wait);
    };
  }