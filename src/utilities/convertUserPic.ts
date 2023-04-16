export function convertUserPic(imageObject: any) {
    return window.btoa(
        String.fromCharCode(...new Uint8Array(imageObject?.data?.data))
    );
}
