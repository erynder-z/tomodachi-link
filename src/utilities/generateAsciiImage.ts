/**
 * Represents a cell in the ASCII art.
 *
 * @class
 */
class Cell {
    public x: number;
    public y: number;
    public symbol: string;
    public color: string;

    /**
     * Creates a new Cell.
     *
     * @constructor
     * @param {number} x - X-coordinate of the cell.
     * @param {number} y - Y-coordinate of the cell.
     * @param {string} symbol - Symbol representing the content of the cell.
     * @param {string} color - Color of the cell.
     */
    constructor(x: number, y: number, symbol: string, color: string) {
        this.x = x;
        this.y = y;
        this.symbol = symbol;
        this.color = color;
    }

    /**
     * Draws the cell on the canvas context.
     *
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     * @returns {void}
     */
    draw(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = 'blue';
        ctx.fillText(this.symbol, this.x + 0.1, this.y + 0.1);
        ctx.fillStyle = this.color;
        ctx.fillText(this.symbol, this.x, this.y);
    }
}

/**
 * Represents an ASCII effect applied to an image.
 *
 * @class
 */
class AsciiEffect {
    #imageCellArray: Cell[] = [];
    #pixels: ImageData;
    #ctx: CanvasRenderingContext2D;
    #width: number;
    #height: number;
    #symbols: string[];

    /**
     * Creates a new AsciiEffect.
     *
     * @constructor
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     * @param {number} width - The width of the canvas.
     * @param {number} height - The height of the canvas.
     * @param {HTMLImageElement} image - The image to apply the effect to.
     * @param {string[]} symbols - An array of symbols to use in the ASCII art.
     */
    constructor(
        ctx: CanvasRenderingContext2D,
        width: number,
        height: number,
        image: HTMLImageElement,
        symbols: string[]
    ) {
        this.#ctx = ctx;
        this.#width = width;
        this.#height = height;
        this.#ctx.drawImage(image, 0, 0, this.#width, this.#height);
        this.#pixels = this.#ctx.getImageData(0, 0, this.#width, this.#height);
        this.#symbols = symbols.slice(); // Create a copy of the symbols array
        this.#shuffleSymbols();
    }

    /**
     * Shuffles the symbols array in-place using the Fisher-Yates algorithm.
     *
     * @private
     * @method
     * @returns {void}
     */
    #shuffleSymbols(): void {
        for (let i = this.#symbols.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.#symbols[i], this.#symbols[j]] = [
                this.#symbols[j],
                this.#symbols[i],
            ];
        }
    }

    /**
     * Converts a grayscale value to a corresponding symbol based on predefined thresholds.
     *
     * @private
     * @method
     * @param {number} g - The grayscale value (0-255) to be converted.
     * @returns {string} - The corresponding symbol.
     */
    #convertToSymbol(g: number): string {
        if (g > 250) return this.#symbols[0];
        else if (g > 240) return this.#symbols[1];
        else if (g > 220) return this.#symbols[2];
        else if (g > 200) return this.#symbols[3];
        else if (g > 180) return this.#symbols[4];
        else if (g > 160) return this.#symbols[5];
        else if (g > 140) return this.#symbols[6];
        else if (g > 120) return this.#symbols[7];
        else if (g > 100) return this.#symbols[8];
        else if (g > 80) return this.#symbols[9];
        else if (g > 60) return this.#symbols[10];
        else if (g > 40) return this.#symbols[11];
        else if (g > 20) return this.#symbols[12];
        else return '';
    }

    /**
     * Scans the image and populates the #imageCellArray based on the given cellSize.
     *
     * @private
     * @method
     * @param {number} cellSize - The size of each cell in the ASCII grid.
     * @returns {void}
     */
    #scanImage(cellSize: number): void {
        this.#imageCellArray = [];
        for (let y = 0; y < this.#pixels.height; y += cellSize) {
            for (let x = 0; x < this.#pixels.width; x += cellSize) {
                const posX = x * 4;
                const posY = y * 4;
                const pos = posY * this.#pixels.width + posX;

                if (this.#pixels.data[pos + 3] > 128) {
                    const red = this.#pixels.data[pos];
                    const green = this.#pixels.data[pos + 1];
                    const blue = this.#pixels.data[pos + 2];
                    const total = red + green + blue;
                    const averageColorValue = total / 3;
                    const color = `rgb(${red},${green},${blue})`;
                    const symbol = this.#convertToSymbol(averageColorValue);

                    if (total > 50) {
                        this.#imageCellArray.push(
                            new Cell(x, y, symbol, color)
                        );
                    }
                }
            }
        }
    }

    /**
     * Draws the ASCII art on the canvas context by clearing the existing content and drawing cells.
     *
     * @private
     * @method
     * @returns {void}
     */
    #drawAscii(): void {
        this.#ctx.clearRect(0, 0, this.#width, this.#height);
        for (let i = 0; i < this.#imageCellArray.length; i++) {
            this.#imageCellArray[i].draw(this.#ctx);
        }
    }

    /**
     * Draws the ASCII art on the canvas using the specified cell size by scanning the image
     * and then rendering the ASCII characters.
     *
     * @public
     * @method
     * @param {number} cellSize - The size of each cell in the ASCII grid.
     * @returns {void}
     */
    draw(cellSize: number): void {
        this.#scanImage(cellSize);
        this.#drawAscii();
    }
}

export function generateAsciiImage(
    baseImage: string,
    canvasId: string,
    cellSize: number
) {
    const card = document.getElementById(canvasId) as HTMLCanvasElement;
    const ctx = card.getContext('2d', {
        willReadFrequently: true,
    }) as CanvasRenderingContext2D;

    const image1 = new Image();
    image1.src = baseImage;
    image1.onload = function initialize() {
        card.width = image1.width;
        card.height = image1.height;
        const symbols = [
            '@',
            '*',
            '+',
            '#',
            '&',
            '%',
            '!',
            ':',
            '%',
            '/',
            '-',
            'X',
            'Y',
        ];
        const effect = new AsciiEffect(
            ctx,
            image1.width,
            image1.height,
            image1,
            symbols
        );
        ctx.font = cellSize * 1.25 + 'px monospace';
        effect.draw(cellSize);
    };
}
