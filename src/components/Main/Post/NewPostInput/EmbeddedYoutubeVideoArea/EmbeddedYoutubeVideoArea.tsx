import { EmbeddedYoutubeVideo } from '../../PostItem/PostEmbeddedYoutubeVideoSection/EmbeddedYoutubeVideo/EmbeddedYoutubeVideo';
import { FaTimes } from 'react-icons/fa';

type EmbeddedYoutubeVideoAreaProps = {
    setYoutubeID: React.Dispatch<React.SetStateAction<string | undefined>>;
    youtubeID: string;
};

export default function EmbeddedYoutubeVideoArea({
    setYoutubeID,
    youtubeID,
}: EmbeddedYoutubeVideoAreaProps) {
    return (
        <div className="relative flex flex-col justify-center items-center text-xs h-auto w-full">
            <span>embedded youtube video preview: </span>
            <div className="w-full">
                <EmbeddedYoutubeVideo videoID={youtubeID} />
                <button
                    onClick={() => {
                        setYoutubeID(undefined);
                    }}
                    className="absolute top-0 right-0 z-50 text-red-500 z-5"
                >
                    <FaTimes size="1.5em" />
                </button>
            </div>
        </div>
    );
}
