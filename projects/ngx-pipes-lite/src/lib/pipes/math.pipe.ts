import {Pipe, PipeTransform} from '@angular/core';

export type Func = 'sum' | 'max' | 'min' | 'hypot' | 'atan2' | 'imul' | 'pow' |
  'sin' | 'cos' | 'abs' | 'acos' | 'acosh' | 'asin' | 'asinh' | 'atan' | 'atanh' |
  'cbrt' | 'ceil' | 'clz32' | 'cosh' | 'exp' | 'expm1' | 'floor' | 'fround' |
  'log' | 'log1p' | 'log2' | 'log10' | 'randomx' | 'round' | 'sign' | 'sinh' |
  'sqrt' | 'tan' | 'tanh' | 'trunc'
  ;

/**
 * Math pipe of javascript {@link Math} .
 *
 * The input args of 1 number or number array depends on {@link Func math function} .
 *
 * Invalid input args will be return {@link NaN} .
 * @usageNotes
 * `number or number[] | math:Func`
 *
 * ```javascript
 *  [2, 3] | math:'pow'     // 2 numbers function: 8
 *  [1, 2, 3] | math:'sum'  // multi numbers function: 6
 *  1.5 | math:'floor'      // 1 number function: 1
 *  10 | math:'randomx'     // Additional: Math.random * 10
 * ```
 * @see Math
 */
@Pipe({
  name: 'math'
})
export class MathPipe implements PipeTransform {
  /**
   * math pipe.
   * @param value number or number array.
   * @param func function
   */
  transform(value: number | number[], func: Func): number {
    if (typeof value === "number") {
      switch (func) {
        case "sin":
          return Math.sin(value);
        case "cos":
          return Math.cos(value);
        case "abs":
          return Math.abs(value);
        case "acos":
          return Math.acos(value);
        case "acosh":
          return Math.acosh(value);
        case "asin":
          return Math.asin(value);
        case "asinh":
          return Math.asinh(value);
        case "atan":
          return Math.atan(value);
        case "atanh":
          return Math.atanh(value);
        case "cbrt":
          return Math.cbrt(value);
        case "ceil":
          return Math.ceil(value);
        case "clz32":
          return Math.clz32(value);
        case "cosh":
          return Math.cosh(value);
        case "exp":
          return Math.exp(value);
        case "expm1":
          return Math.expm1(value);
        case "floor":
          return Math.floor(value);
        case "fround":
          return Math.fround(value);
        case "log":
          return Math.log(value);
        case "log1p":
          return Math.log1p(value);
        case "log2":
          return Math.log2(value);
        case "log10":
          return Math.log10(value);
        case "randomx":
          return Math.random() * value;
        case "round":
          return Math.round(value);
        case "sign":
          return Math.sign(value);
        case "sinh":
          return Math.sinh(value);
        case "sqrt":
          return Math.sqrt(value);
        case "tan":
          return Math.tan(value);
        case "tanh":
          return Math.tanh(value);
        case "trunc":
          return Math.trunc(value);
      }
    }
    if (value instanceof Array) {
      switch (func) {
        case "sum":
          return value.reduce((acc, curr) => acc + curr, 0);
        case "max":
          return Math.max(...value);
        case "min":
          return Math.min(...value);
        case "hypot":
          return Math.hypot(...value);
        case "atan2":
          return Math.atan2(value[0], value[1]);
        case "imul":
          return Math.imul(value[0], value[1]);
        case "pow":
          return Math.pow(value[0], value[1]);
      }
    }
    return NaN;
  }
}
