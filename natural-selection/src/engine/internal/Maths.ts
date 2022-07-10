export class MathsClass implements Math {
  readonly TAU = Math.PI * 2;
  readonly HALF_PI = Math.PI / 2;
  readonly QUARTER_PI = Math.PI / 4;
  readonly DEG_TO_RAD = Math.PI / 180;
  readonly RAD_TO_DEG = 180 / Math.PI;
  readonly EPSILON = 0.000001;

  /**
   * The clamp function restricts a value between a minimum and maximum value. 
   * @param value 
   * @param min Min Value
   * @param max Max Value
   * @returns The value clamped between min and max
   */
  clamp(value: number, min: number, max: number): number {
    return value < min ? min : value > max ? max : value;
  }

  /**
   * Linear interpolation between two value.
   * @param a Start number
   * @param b End number
   * @param t Time between 0 and 1
   * @returns Lerped number
   */
  lerp(a: number, b: number, t: number): number {
    return a + (b - a) * t;
  }

  /**
   * Linear interpolation between two angles.
   * @param a Start angle in radians
   * @param b End angle in radians
   * @param t Time between 0 and 1
   * @returns Lerped angle in radians
   */
  lerpAngle(a: number, b: number, t: number): number {
    return this.lerp(a, b, t) % this.TAU;
  }

  /**
   * Transforms a radian angle to a degree angle.
   * @param rad Angle in radians
   * @returns Angle in degrees
   */
  rad2deg(rad: number): number {
    return rad * this.RAD_TO_DEG;
  }

  /**
   * Transforms a degree angle to a radian angle.
   * @param deg Angle in degrees
   * @returns Angle in radians
   */
  deg2rad(deg: number): number {
    return deg * this.DEG_TO_RAD;
  }


  /*\
  |*|
  |*| Math class extension
  |*|
  \*/

  readonly PI = Math.PI;
  readonly E = Math.E;
  readonly LOG2E: number = Math.LOG2E;
  readonly LOG10E: number = Math.LOG10E;
  readonly LN10: number = Math.LN10;
  readonly LN2: number = Math.LN2;
  readonly SQRT1_2: number = Math.SQRT1_2;
  readonly SQRT2: number = Math.SQRT2;

  readonly abs = Math.abs;
  readonly acos = Math.acos;
  readonly acosh = Math.acosh;
  readonly asin = Math.asin;
  readonly asinh = Math.asinh;
  readonly atan = Math.atan;
  readonly atanh = Math.atanh;
  readonly atan2 = Math.atan2;
  readonly cbrt = Math.cbrt;
  readonly ceil = Math.ceil;
  readonly cos = Math.cos;
  readonly cosh = Math.cosh;
  readonly clz32 = Math.clz32;
  readonly exp = Math.exp;
  readonly expm1 = Math.expm1;
  readonly floor = Math.floor;
  readonly fround = Math.fround;
  readonly hypot = Math.hypot;
  readonly imul = Math.imul;
  readonly log = Math.log;
  readonly log2 = Math.log2;
  readonly log1p = Math.log1p;
  readonly log10 = Math.log10;
  readonly max = Math.max;
  readonly min = Math.min;
  readonly pow = Math.pow;
  readonly random = Math.random;
  readonly round = Math.round;
  readonly sin = Math.sin;
  readonly sinh = Math.sinh;
  readonly sqrt = Math.sqrt;
  readonly tan = Math.tan;
  readonly tanh = Math.tanh;
  readonly trunc = Math.trunc;
  readonly sign = Math.sign;

  [Symbol.toStringTag]: string = 'Maths';
}

export const Maths = new MathsClass();

Maths.abs
