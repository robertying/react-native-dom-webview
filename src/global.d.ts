declare module NodeJS {
  interface Global {
    DOM: (module: string) => string;
  }
}
