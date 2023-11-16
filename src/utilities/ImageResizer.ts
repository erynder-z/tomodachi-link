import Resizer from 'react-image-file-resizer';

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
