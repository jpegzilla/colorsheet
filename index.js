const LUM_LOWER = 0.03928;
const LUM_DIVISOR_H = 12.92;
const LUM_DIVISOR_L = 1.055;
const LUM_ADDEND = 0.055;
const LUM_EXP = 2.4;

const LUM_COEFF = 0.2126;
const LUM_R_ADDEND = 0.7152;
const LUM_G_ADDEND = 0.0722;
const RGB_MAX = 255;

// general utils

const hexDigits = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f"
];

const hex = num => {
  return isNaN(num)
    ? "00"
    : hexDigits[(num - (num % 16)) / 16] + hexDigits[num % 16];
};

const wcagLevels = {
  fail: {
    range: [0, 3]
  },
  "aa Large": {
    range: [3, 4.5]
  },
  aa: {
    range: [4.5, 7]
  },
  aaa: {
    range: [7, 22]
  }
};

const utils = {
  hex: hex,
  wcagLevels: wcagLevels
};

// color utils

/**
 * calculateLuminance - color to calculate the luminance of an rgb color
 *
 * @param {number} r color red from 0-255
 * @param {number} g color green from 0-255
 * @param {number} b color blue from 0-255
 *
 * @returns {number} luminance
 */
const calculateLuminance = (r, g, b) => {
  if (r == undefined || g == undefined || b == undefined)
    throw new Error("calculateLuminance requires three arguments.");

  if (typeof r != "number" || typeof g != "number" || typeof b != "number")
    throw new Error("arguments passed to calculateLuminance must be numbers.");

  const srgb = [r, g, b].map(val => val / RGB_MAX);
  const [R, G, B] = srgb.map(
    val =>
      val <= LUM_LOWER
        ? val / LUM_DIVISOR_H
        : ((val + LUM_ADDEND) / LUM_DIVISOR_L) ** LUM_EXP
  );

  const L = LUM_COEFF * R + LUM_R_ADDEND * G + LUM_G_ADDEND * B;

  return L;
};

/**
 * hexToRGBA - converts hex colors to rgb(a) colors
 *
 * @param {string} hex hex color value as a string
 *
 * @returns {object} rgb object with r, g, b and optionally a keys
 */
const hexToRGBA = hex => {
  if (hex == undefined || typeof hex != "string" || hex.length < 3)
    throw new Error("invalid hex value passed to hexToRGBA");

  if (hex.indexOf("#") == 0) hex = hex.substring(1);

  const acceptableCharacters = /^(?:[0-9a-fA-F]{3,8})$/;

  if (!hex.match(acceptableCharacters))
    throw new Error(`parameter '${hex}' is not a valid hex color.`);

  if (hex.length == 6) {
    let rgb = parseInt(hex, 16);
    let r = (rgb >> 16) & 0xff;
    let g = (rgb >> 8) & 0xff;
    let b = rgb & 0xff;

    if (isNaN(r) || isNaN(g) || isNaN(b))
      throw new Error("please enter rgb(a) values only between 0 and F.");

    return { r, g, b };
  } else if (hex.length == 3) {
    hex.split("");
    hex = [hex[0], hex[0], hex[1], hex[1], hex[2], hex[2]];
    hex = "0x" + hex.join("");
    let rgb = parseInt(hex, 16);
    let r = (rgb >> 16) & 0xff;
    let g = (rgb >> 8) & 0xff;
    let b = rgb & 0xff;

    if (isNaN(r) || isNaN(g) || isNaN(b))
      throw new Error("please enter rgb(a) values only between 0 and F.");

    return { r, g, b };
  } else if (hex.length == 8) {
    let a = hex.substring(6, 8);
    hex = hex.substring(0, 6);
    let rgb = parseInt(hex, 16);
    let r = (rgb >> 16) & 0xff;
    let g = (rgb >> 8) & 0xff;
    let b = rgb & 0xff;
    a = "0x" + a;
    a = parseInt(a);

    if (isNaN(a) || isNaN(r) || isNaN(g) || isNaN(b))
      throw new Error("please enter rgb(a) values only between 0 and F.");

    return { r, g, b, a };
  } else if (hex.length == 4) {
    let a = hex.substring(3, 4).split("");

    hex = hex.substring(0, 3).split("");
    hex = [hex[0], hex[0], hex[1], hex[1], hex[2], hex[2]];
    hex = "0x" + hex.join("");

    a = [a[0], a[0]];
    a = "0x" + a.join("");
    a = parseInt(a);

    let rgb = parseInt(hex, 16);
    let r = (rgb >> 16) & 0xff;
    let g = (rgb >> 8) & 0xff;
    let b = rgb & 0xff;

    if (isNaN(a) || isNaN(r) || isNaN(g) || isNaN(b))
      throw new Error("please enter rgb(a) values only between 0 and F.");

    return { r: r, g: g, b: b, a: a };
  } else {
    throw new Error(`parameter '${hex}' is not valid.`);
  }
};

/**
 * rgbToHex - converts rgb color to hex color
 *
 * @param {number} r red color number
 * @param {number} g green color number
 * @param {number} b blue color number
 *
 * @returns {string} string representing a hex color
 */
const rgbToHex = (r, g, b) => `#${utils.hex(r)}${utils.hex(g)}${utils.hex(b)}`;

/**
 * hslToRGB - convert hsl color to rgb
 *
 * @param {number} h hue number
 * @param {number} s saturation number
 * @param {number} l lightness number
 *
 * @returns {object} rgb object with red, green, and blue keys
 */
const hslToRGB = (h, s, l) => {
  if (h == undefined || s == undefined || l == undefined)
    throw new Error("hslToRGB requires three arguments.");

  if (typeof h != "number" || typeof s != "number" || typeof l != "number")
    throw new Error("arguments passed to hslToRGB must be numbers.");

  let r, g, b;

  if (s == 0) r = g = b = l;
  else {
    const hueToRGB = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    let p = 2 * l - q;

    r = hueToRGB(p, q, h + 1 / 3);
    g = hueToRGB(p, q, h);
    b = hueToRGB(p, q, h - 1 / 3);
  }

  return {
    r: Math.round(r * RGB_MAX),
    g: Math.round(g * RGB_MAX),
    b: Math.round(b * RGB_MAX)
  };
};

/**
 * rgbToHSL - convert rgb color to hsl color
 *
 * @param {number} r red color number
 * @param {number} g green color number
 * @param {number} b blue color number
 *
 * @returns {object} object with h, s, and l keys
 */
const rgbToHSL = (r, g, b) => {
  if (r == undefined || g == undefined || b == undefined)
    throw new Error("rgbToHSL requires three arguments.");

  if (typeof r != "number" || typeof g != "number" || typeof b != "number")
    throw new Error("arguments passed to rgbToHSL must be numbers.");

  (r /= RGB_MAX), (g /= RGB_MAX), (b /= RGB_MAX);

  let max = Math.max(r, g, b);
  let min = Math.min(r, g, b);

  let l = (max + min) / 2;
  let s = 0;
  let h = 0;
  if (max != min) {
    if (l < 0.5) s = (max - min) / (max + min);
    else s = (max - min) / (2 - max - min);

    if (r == max) h = (g - b) / (max - min);
    else if (g == max) h = 2 + (b - r) / (max - min);
    else h = 4 + (r - g) / (max - min);
  }

  l = l * 100;
  s = s * 100;
  h = h * 60;
  if (h < 0) h += 360;

  return {
    h: h.toFixed(2),
    s: s.toFixed(2) + "%",
    l: l.toFixed(2) + "%"
  };
};

/**
 * rgbToNHSL - rgb to number hsl - hsl with decimal / integer values instead of typical hsl notation
 *
 * @param {number} r color red from 0-255
 * @param {number} g color green from 0-255
 * @param {number} b color blue from 0-255
 *
 * @returns {object} object containing hue, saturation, and lightness values
 */
const rgbToNHSL = (r, g, b) => {
  if (r == undefined || g == undefined || b == undefined)
    throw new Error("rgbToNHSL requires three arguments.");

  if (typeof r != "number" || typeof g != "number" || typeof b != "number")
    throw new Error("arguments passed to rgbToNHSL must be numbers.");

  (r /= RGB_MAX), (g /= RGB_MAX), (b /= RGB_MAX);

  let max = Math.max(r, g, b);
  let min = Math.min(r, g, b);

  let l = (max + min) / 2;
  let s = 0;
  let h = 0;
  if (max != min) {
    if (l < 0.5) s = (max - min) / (max + min);
    else s = (max - min) / (2 - max - min);

    if (r == max) h = (g - b) / (max - min);
    else if (g == max) h = 2 + (b - r) / (max - min);
    else h = 4 + (r - g) / (max - min);
  }

  l = l * 100;
  s = s * 100;
  h = h * 60;

  // if hue is less than zero, wrap it around to be back in range
  if (h < 0) h += 360;

  return {
    h: h,
    s: s,
    l: l
  };
};

/**
 * shiftHue - shifts the hue value of an rgb color
 *
 * @param {object} rgb object with red, green, and blue keys
 * @param {number} deg amount to shift the hue of the color
 *
 * @returns {object} rgb object with red, green, and blue keys
 */
const shiftHue = (rgb, deg) => {
  let hsl = rgbToNHSL(rgb.r, rgb.g, rgb.b);

  if (deg > 100 || deg < 0)
    throw new RangeError(
      "amount of hue shifting in shiftHue must be within the range [0, 100]."
    );

  hsl.h += deg;
  if (hsl.h < 0) hsl.h += 360;
  if (hsl.h > 360) hsl.h -= 360;
  hsl.h /= 360;
  hsl.s /= 100;
  hsl.l /= 100;

  return hslToRGB(hsl.h, hsl.s, hsl.l);
};

/**
 * getContrastRatio - get the contrast rati between two colors
 *
 * @param {string} hex1 first hex value for contrast calculation
 * @param {string} hex2 second hex value for contrast calculation
 *
 * @returns {object} contrast ratio object with contrast ratio represented as a string and a decimal
 */
const getContrastRatio = (hex1, hex2) => {
  if (hex1 == undefined || hex2 == undefined)
    throw new Error("getContrastRatio requires two arguments.");
  if (typeof hex1 != "string" || typeof hex2 != "string")
    throw new Error("arguments to getContrastRatio must be strings.");

  let txRGB = hexToRGBA(hex1);
  let bgRGB = hexToRGBA(hex2);

  const lum1 = calculateLuminance(txRGB.r, txRGB.g, txRGB.b);
  const lum2 = calculateLuminance(bgRGB.r, bgRGB.g, bgRGB.b);

  const light = Math.max(lum1, lum2);
  const dark = Math.min(lum1, lum2);

  const contrast = (light + 0.05) / (dark + 0.05);
  const contrastNum = Math.floor(contrast * 100) / 100;

  const contrastString = `${(light + 0.05).toFixed(2)}:${(dark + 0.05).toFixed(
    2
  )}`;

  return { number: contrastNum, string: contrastString };
};

const getWcagLevels = ratio => {
  if (ratio == undefined || typeof ratio != "number")
    throw new Error("invalid argument passed to getWcagLevels.");

  for (let i in utils.wcagLevels) {
    for (let j in utils.wcagLevels[i]) {
      let levels = utils.wcagLevels[i][j];
      if (ratio >= levels[0] && ratio <= levels[1]) {
        return `wcag: ${ratio
          .toFixed(2)
          .toString()
          .padEnd(4, "0")
          .padStart(5, "0")} (${i.toUpperCase()})`;
      }
    }
  }
};

const colorsheet = {
  shiftHue: shiftHue,
  hexToRGBA: hexToRGBA,
  calculateLuminance: calculateLuminance,
  hslToRGB: hslToRGB,
  rgbToHSL: rgbToHSL,
  rgbToNHSL: rgbToNHSL,
  rgbToHex: rgbToHex,
  getWcagLevels: getWcagLevels,
  getContrastRatio: getContrastRatio
};

module.exports = colorsheet;
