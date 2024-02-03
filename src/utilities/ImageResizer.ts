import Resizer from 'react-image-file-resizer';

/**
 * Resizes an image file asynchronously to the specified dimensions and format using the react-image-file-resizer library.
 *
 * @param {File} file - The input image file to be resized.
 * @returns {Promise<string>} - A promise that resolves with the resized image as a data URI.
 */
const resizeFile = (file: File) =>
    // resize images to 500x500px
    new Promise((resolve) => {
        Resizer.imageFileResizer(
            file,
            500,
            500,
            'WEBP',
            80,
            0,
            (uri) => {
                resolve(uri);
            },
            'file'
        );
    });

export default resizeFile;
