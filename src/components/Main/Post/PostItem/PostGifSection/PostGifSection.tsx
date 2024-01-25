type PostGifSectionProps = {
    handleGifClick: (gifURL: string) => void;
    gifUrl: string;
};

/**
 * Represents a component for displaying a GIF within a post section.
 *
 * @component
 * @param {PostGifSectionProps} props - The component properties.
 * @returns {JSX.Element} The rendered PostGifSection component.
 */
export default function PostGifSection({
    handleGifClick,
    gifUrl,
}: PostGifSectionProps): JSX.Element {
    /**
     * The rendered PostGifSection component.
     *
     * @type {JSX.Element}
     */
    return (
        <div className="flex justify-center">
            <img
                loading="lazy"
                onClick={() => handleGifClick(gifUrl)}
                className="w-fit h-auto object-cover cursor-pointer"
                src={gifUrl}
                alt="User uploaded gif"
            />
        </div>
    );
}
