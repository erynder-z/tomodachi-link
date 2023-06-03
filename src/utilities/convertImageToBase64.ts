export function convertImageToBase64(imageObject: any) {
    const bufferData = imageObject?.data?.data
        ? imageObject?.data?.data
        : imageObject?.data;
    const uint8Array = new Uint8Array(bufferData);
    const base64Data = uint8Array.reduce((data, byte) => {
        return data + String.fromCharCode(byte);
    }, '');
    return window.btoa(base64Data);
}
