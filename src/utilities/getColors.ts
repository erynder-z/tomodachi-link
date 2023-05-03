import extractColors from 'extract-colors';
import tinycolor from 'tinycolor2';

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
