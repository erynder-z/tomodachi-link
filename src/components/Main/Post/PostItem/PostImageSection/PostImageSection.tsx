import { ImageType } from '../../../../../types/miscTypes';

type PostImageSectionProps = {
    handleImageClick: (image: ImageType) => void;
    databaseImage: ImageType;
    convertedImage: string;
};

/**
 * Represents a component for displaying an image within a post section.
 *
 * @component
 * @param {PostImageSectionProps} props - The component properties.
 * @returns {JSX.Element} The rendered PostImageSection component.
 */
export default function PostImageSection({
    handleImageClick,
    databaseImage,
    convertedImage,
}: PostImageSectionProps): JSX.Element {
    /**
     * The rendered PostImageSection component.
     *
     * @type {JSX.Element}
     */
    return (
        <div className="flex justify-center">
            <img
                loading="lazy"
                onClick={() => handleImageClick(databaseImage)}
                className="w-fit h-auto object-cover cursor-pointer"
                src={`data:image/png;base64,${convertedImage}`}
                alt="User uploaded image"
            />
        </div>
    );
}
