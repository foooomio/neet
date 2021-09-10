import {
  DAY,
  format,
  HOUR,
  parse,
} from "https://deno.land/std@0.106.0/datetime/mod.ts";

const JST = 9 * HOUR;
const START = new Date(Date.UTC(2017, 3 - 1, 10) - JST);

export function parseYMD(str: string): Date {
  return new Date(parse(str, "yyyyMMdd").getTime() - JST);
}

export function formatYMD(date: Date): string {
  return format(date, "yyyyMMdd");
}

export function calcTotal(date: Date): number {
  return Math.floor((date.getTime() - START.getTime()) / DAY) + 1;
}

export function calcYears(date: Date): { years: number; days: number } {
  const anchor = new Date(START.getTime() - DAY);
  anchor.setFullYear(date.getFullYear());
  if (date < anchor) {
    anchor.setFullYear(date.getFullYear() - 1);
  }
  return {
    years: anchor.getFullYear() - START.getFullYear(),
    days: Math.floor((date.getTime() - anchor.getTime()) / DAY),
  };
}
