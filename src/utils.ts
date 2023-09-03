import { Writable, get } from "svelte/store";
import type { FlyParams } from "svelte/transition";
import { allowScroll, orientation, scrollDir } from "./Stores";

export function getTransitions(dir: boolean): { [key: string]: FlyParams } {
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

export function throttle(func: any, wait: number) {
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

export function getKeyFromName(name: string): string {
  return name.toLowerCase().replaceAll(" ", "-").replaceAll("'", "");
}

export const orientationQuery = "(orientation:landscape) and (min-width: 1200px)";


export const sortEntriesBasedOnIndex = (a: any, b: any) => a[1].index - b[1].index;

export function processEntries(entries: any[], entryMap: Map<string, any>, jumpNames: Map<number, string>, indexOffset: number, imageMap?: Map<number, HTMLImageElement>) {
  return ([key, entr]:[string, any], i:number) => { 
    entries.push({
      "key": key,
      "data": entr,
      "isLast": i+1+indexOffset === entryMap.size
    });
    jumpNames.set(i+indexOffset, entr.name);
  
    if (entr.image && imageMap) {
      const img = new Image();
      img.onload = () => {
        imageMap.set(i+indexOffset, img);
      }
      img.src = entr.image;
    }
  
    return entr; 
  }
}

function interceptScroll(entries: any[], scrollIdx: Writable<number>, e: WheelEvent) {
  const direction:boolean = e.deltaY > 0; // true = down, false = up
  const index = get(scrollIdx);

  if (!(index === 0 && !direction) && !(index === entries.length-1 && direction) && Math.abs(e.deltaY) != 0) {
    if (direction) {
      scrollIdx.set(index+1);
    } else {
      scrollIdx.set(index-1);
    }
    scrollDir.set(direction);
  } else {
    allowScroll.set(true);
  }
}

export function manageScroll(entries: any[], scrollIdx: Writable<number>) {
  return (e: WheelEvent) => {
    if (get(orientation) === 0) {
      if (get(allowScroll)) {
        allowScroll.set(false);
        setTimeout(() => allowScroll.set(true), 300);
        interceptScroll(entries, scrollIdx, e);
      }
    }
  }
}

export function interceptScrollFromIdx(direction:boolean, tarIdx:number, scrollIdx: Writable<number>) {
  scrollIdx.set(tarIdx);
  scrollDir.set(direction);
}

export function jumpToHandler(scrollIdx: Writable<number>) {
  return (e: MouseEvent) => {
    const target:HTMLElement = <HTMLElement>e.currentTarget;
    const curIdx = get(scrollIdx);
    const tarIdx:number = parseInt(target.id.substring(0, target.id.indexOf('-')));
    interceptScrollFromIdx(curIdx < tarIdx, tarIdx, scrollIdx);
  }
}