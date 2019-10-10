## colorsheet

colorsheet is a small library containing several functions for converting between color formats and calculating things like contrast and luminance.

usage:

`npm i colorsheet`

then (example):

```javascript
const colorsheet = require('colorsheet')

const emerald = colorsheet.hexToRGBA("#50c878")
// returns {r: 80, g: 200, b: 120}
```

here's what it exposes:

```
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
```

## functions

<dl>
<dt><a href="#calculateLuminance">calculateLuminance(r, g, b)</a> ⇒ <code>number</code></dt>
<dd><p>calculateLuminance - color to calculate the luminance of an rgb color</p>
</dd>
<dt><a href="#hexToRGBA">hexToRGBA(hex)</a> ⇒ <code>object</code></dt>
<dd><p>hexToRGBA - converts hex colors to rgb(a) colors</p>
</dd>
<dt><a href="#rgbToHex">rgbToHex(r, g, b)</a> ⇒ <code>string</code></dt>
<dd><p>rgbToHex - converts rgb color to hex color</p>
</dd>
<dt><a href="#hslToRGB">hslToRGB(h, s, l)</a> ⇒ <code>object</code></dt>
<dd><p>hslToRGB - convert hsl color to rgb</p>
</dd>
<dt><a href="#rgbToHSL">rgbToHSL(r, g, b)</a> ⇒ <code>object</code></dt>
<dd><p>rgbToHSL - convert rgb color to hsl color</p>
</dd>
<dt><a href="#rgbToNHSL">rgbToNHSL(r, g, b)</a> ⇒ <code>object</code></dt>
<dd><p>rgbToNHSL - rgb to number hsl - hsl with decimal / integer values instead of typical hsl notation</p>
</dd>
<dt><a href="#shiftHue">shiftHue(rgb, deg)</a> ⇒ <code>object</code></dt>
<dd><p>shiftHue - shifts the hue value of an rgb color</p>
</dd>
<dt><a href="#getContrastRatio">getContrastRatio(hex1, hex2)</a> ⇒ <code>object</code></dt>
<dd><p>getContrastRatio - get the contrast rati between two colors</p>
</dd>
</dl>

<a name="calculateLuminance"></a>

## calculateLuminance(r, g, b) ⇒ <code>number</code>
calculateLuminance - color to calculate the luminance of an rgb color

**kind**: global function
**returns**: <code>number</code> - luminance

| param | type | description |
| --- | --- | --- |
| r | <code>number</code> | color red from 0-255 |
| g | <code>number</code> | color green from 0-255 |
| b | <code>number</code> | color blue from 0-255 |

<a name="hexToRGBA"></a>

## hexToRGBA(hex) ⇒ <code>object</code>
hexToRGBA - converts hex colors to rgb(a) colors

**kind**: global function
**returns**: <code>object</code> - rgb object with r, g, b and optionally a keys

| param | type | description |
| --- | --- | --- |
| hex | <code>string</code> | hex color value as a string |

<a name="rgbToHex"></a>

## rgbToHex(r, g, b) ⇒ <code>string</code>
rgbToHex - converts rgb color to hex color

**kind**: global function
**returns**: <code>string</code> - string representing a hex color

| param | type | description |
| --- | --- | --- |
| r | <code>number</code> | red color number |
| g | <code>number</code> | green color number |
| b | <code>number</code> | blue color number |

<a name="hslToRGB"></a>

## hslToRGB(h, s, l) ⇒ <code>object</code>
hslToRGB - convert hsl color to rgb

**kind**: global function
**returns**: <code>object</code> - rgb object with red, green, and blue keys

| param | type | description |
| --- | --- | --- |
| h | <code>number</code> | hue number |
| s | <code>number</code> | saturation number |
| l | <code>number</code> | lightness number |

<a name="rgbToHSL"></a>

## rgbToHSL(r, g, b) ⇒ <code>object</code>
rgbToHSL - convert rgb color to hsl color

**kind**: global function
**returns**: <code>object</code> - object with h, s, and l keys

| param | type | description |
| --- | --- | --- |
| r | <code>number</code> | red color number |
| g | <code>number</code> | green color number |
| b | <code>number</code> | blue color number |

<a name="rgbToNHSL"></a>

## rgbToNHSL(r, g, b) ⇒ <code>object</code>
rgbToNHSL - rgb to number hsl - hsl with decimal / integer values instead of typical hsl notation

**kind**: global function
**returns**: <code>object</code> - object containing hue, saturation, and lightness values

| param | type | description |
| --- | --- | --- |
| r | <code>number</code> | color red from 0-255 |
| g | <code>number</code> | color green from 0-255 |
| b | <code>number</code> | color blue from 0-255 |

<a name="shiftHue"></a>

## shiftHue(rgb, deg) ⇒ <code>object</code>
shiftHue - shifts the hue value of an rgb color

**kind**: global function
**returns**: <code>object</code> - rgb object with red, green, and blue keys

| param | type | description |
| --- | --- | --- |
| rgb | <code>object</code> | object with red, green, and blue keys |
| deg | <code>number</code> | amount to shift the hue of the color |

<a name="getContrastRatio"></a>

## getContrastRatio(hex1, hex2) ⇒ <code>object</code>
getContrastRatio - get the contrast rati between two colors

**kind**: global function
**returns**: <code>object</code> - contrast ratio object with contrast ratio represented as a string and a decimal

| param | type | description |
| --- | --- | --- |
| hex1 | <code>string</code> | first hex value for contrast calculation |
| hex2 | <code>string</code> | second hex value for contrast calculation |
