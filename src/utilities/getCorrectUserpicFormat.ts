export const getCorrectUserpicFormat = (pic: any) => {
    if (typeof pic.data !== 'string') {
        return window.btoa(
            new Uint8Array(pic.data).reduce(function (data, byte) {
                return data + String.fromCharCode(byte);
            }, '')
        );
    } else {
        return pic.data;
    }
};
