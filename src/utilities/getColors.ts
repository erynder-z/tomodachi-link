import extractColors from 'extract-colors';
import tinycolor from 'tinycolor2';

export const getColors = (image: string) => {
    return extractColors(image)
        .then((colors) => {
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
        })
        .catch(console.error);
};
