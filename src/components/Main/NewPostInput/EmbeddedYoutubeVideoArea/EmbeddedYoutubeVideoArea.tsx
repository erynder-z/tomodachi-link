import React from 'react';
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
        <div className="relative flex flex-col text-xs h-auto w-full">
            <span>embedded youtube video preview: </span>
            <button
                onClick={() => {
                    setYoutubeID(undefined);
                }}
                className="absolute top-5 right-2 text-red-500 z-5"
            >
                <FaTimes size="1.5em" />
            </button>
            <EmbeddedYoutubeVideo videoID={youtubeID} />
        </div>
    );
}
