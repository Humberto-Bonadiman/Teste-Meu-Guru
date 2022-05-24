import type {Config} from '@jest/types';
import { defaults } from 'jest-config';

// Sync object
const config: Config.InitialOptions = {
  verbose: true,
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'js', 'ts', 'tsx'],
  transform: {
    "^.+\\.(t|j)sx?$": [
      "@swc/jest",
      {
        jsc: {
          parser: {
            syntax: "typescript",
            tsx: true,
            decorators: true,
          },
          keepClassNames: true,
          transform: {
            legacyDecorator: true,
            decoratorMetadata: true,
            react: {
              runtime: "automatic",
            },
          },
        },
        module: {
          type: "es6",
          noInterop: false,
        },
      },
    ],
  },
};
export default config;