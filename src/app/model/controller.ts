import { Result } from "./result.ts";

export type ControllerType =  Record<string, ({ body, url }: { body: any; url: string }) => Result>
