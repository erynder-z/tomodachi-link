import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { EmbeddedYoutubeVideo } from '../../PostItem/PostEmbeddedYoutubeVideoSection/EmbeddedYoutubeVideo/EmbeddedYoutubeVideo';

type PostEditEmbeddedYoutubeVideoProps = {
    postVideoID: string;
    handleVideoDelete: () => void;
};

export default function PostEditEmbeddedYoutubeVideo({
    postVideoID,
    handleVideoDelete,
}: PostEditEmbeddedYoutubeVideoProps) {
    const handleRemoveButtonClick = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.preventDefault();
        handleVideoDelete();
    };
    return (
        <div className="relative flex flex-col justify-center items-center text-xs h-auto w-full">
            <EmbeddedYoutubeVideo videoID={postVideoID} />

            <button
                onClick={(e) => {
                    handleRemoveButtonClick(e);
                }}
                className="absolute top-0 right-0 text-red-500 z-5"
            >
                <FaTimes size="1.25rem" />
            </button>
        </div>
    );
}
