import { EmbeddedYoutubeVideo } from './EmbeddedYoutubeVideo/EmbeddedYoutubeVideo';

type PostEmbeddedYoutubeVideoSectionProps = {
    postVideoID: string;
};

/**
 * Represents a component for displaying an embedded YouTube video within a post section.
 *
 * @component
 * @param {PostEmbeddedYoutubeVideoSectionProps} props - The component properties.
 * @returns {JSX.Element} The rendered PostEmbeddedYoutubeVideoSection component.
 */
export default function PostEmbeddedYoutubeVideoSection({
    postVideoID,
}: PostEmbeddedYoutubeVideoSectionProps): JSX.Element {
    /**
     * The rendered PostEmbeddedYoutubeVideoSection component.
     *
     * @type {JSX.Element}
     */
    return (
        <div className="flex flex-col text-xs h-auto w-full">
            <EmbeddedYoutubeVideo videoID={postVideoID} />
        </div>
    );
}
