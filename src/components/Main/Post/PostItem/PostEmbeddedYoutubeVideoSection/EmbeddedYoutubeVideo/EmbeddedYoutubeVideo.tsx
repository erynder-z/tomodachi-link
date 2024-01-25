import './EmbeddedYoutubeVideo.css';

type EmbeddedYoutubeVideoProps = {
    videoID: string;
};

/**
 * Represents a component for embedding YouTube videos.
 *
 * @component
 * @param {EmbeddedYoutubeVideoProps} props - The component properties.
 * @returns {JSX.Element} The rendered EmbeddedYoutubeVideo component.
 */
export const EmbeddedYoutubeVideo = ({
    videoID,
}: EmbeddedYoutubeVideoProps): JSX.Element => {
    /**
     * The rendered EmbeddedYoutubeVideo component.
     *
     * @type {JSX.Element}
     */
    return (
        <div className="relative h-0 overflow-hidden w-3/4 pb-youtube mx-auto">
            <iframe
                loading="lazy"
                className="absolute inset-0 w-full h-full"
                title={`YouTube Video ${videoID}`}
                src={`https://www.youtube.com/embed/${videoID}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />
        </div>
    );
};
