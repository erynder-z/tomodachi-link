export function convertImageToBase64(imageObject: {
    data: { data: Buffer };
    contentType: string;
}) {
    const arrayBuffer = imageObject?.data?.data;
    return window.btoa(
        new Uint8Array(arrayBuffer).reduce(function (data, byte) {
            return data + String.fromCharCode(byte);
        }, '')
    );
}
