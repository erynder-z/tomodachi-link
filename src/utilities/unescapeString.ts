export function unescapeString(escapedString: string): string {
    return escapedString.replace(/&#x([0-9A-Fa-f]+);/g, (match, hex) =>
        String.fromCharCode(parseInt(hex, 16))
    );
}
