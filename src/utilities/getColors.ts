import extractColors from 'extract-colors';
import tinycolor from 'tinycolor2';

/**
 * Retrieves color information from an image using the extract-colors library.
 * If the image has only one color, it returns a lighter version of that color;
 * otherwise, it returns a desaturated version of each color in the palette.
 *
 * @param {string} image - The URL or data URI of the image.
 * @returns {Promise<Array<{ hex: string }>>} - A promise that resolves to an array of color objects with hexadecimal values.
 * @throws {Error} - If there is an error during color extraction.
 */
export const getColors = (image: string) => {
    return extractColors(image)
        .then((colors) => {
            if (colors.length === 1) {
                const lighterColor = tinycolor(colors[0].hex)
                    .lighten(25)
                    .toHexString();
                return [{ hex: lighterColor }];
            } else {
                const newPalette = colors.map((color) => {
                    const { h, s, l } = tinycolor(color.hex).toHsl();
                    const desaturated = tinycolor({
                        h,
                        s: s * 0.75,
                        l,
                    }).toHexString();
                    return { ...color, hex: desaturated };
                });
                return newPalette;
            }
        })
        .catch(console.error);
};
