export const orientationQuery = "(orientation:landscape) and (min-width: 1200px)";

export const sortEntriesBasedOnIndex = (a: any, b: any) => a.index - b.index;

export function getIdFromName(name: string): string {
  return name.toLowerCase().replaceAll(" ", "-").replaceAll("'", "");
}