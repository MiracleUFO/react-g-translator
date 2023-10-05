/* eslint-disable import/no-extraneous-dependencies */
// @ts-check

/* eslint-env node */
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import dts from 'rollup-plugin-dts';
import json from '@rollup/plugin-json';

/**
 * Rollup configuration to build the main bundle.
 * @type {import('rollup').RollupOptions}
 */
const mainConfig = {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.esm.js',
      format: 'esm',
      sourcemap: true,
    },
    {
      file: 'dist/index.js',
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: 'dist/index.min.js',
      format: 'umd',
      name: 'DatePicker',
      plugins: [terser()],
      sourcemap: true,
      globals: {
        react: 'React',
      },
    },
  ],
  plugins: [
    nodeResolve(),
    commonjs(),
    json(),
    typescript({
      tsconfig: './tsconfig.build.json',
      declaration: false,
    }),
  ],
};

/**
 * Rollup configuration to build the type declaration file.
 * @type {import('rollup').RollupOptions}
 */
export const dtsConfig = {
  input: 'src/index.ts',
  output: [{ file: 'dist/index.d.ts', format: 'es' }],
  plugins: [
    dts({
      tsconfig: './tsconfig.build.json',
      compilerOptions: {
        preserveSymlinks: false,
      },
    }),
  ],
};

export default [mainConfig, dtsConfig];
