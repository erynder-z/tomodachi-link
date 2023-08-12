import React from 'react';
import { EmbeddedYoutubeVideo } from './EmbeddedYoutubeVideo/EmbeddedYoutubeVideo';

type PostEmbeddedYoutubeVideoSectionProps = {
    postVideoID: string;
};

export default function PostEmbeddedYoutubeVideoSection({
    postVideoID,
}: PostEmbeddedYoutubeVideoSectionProps) {
    return (
        <div className="flex flex-col text-xs h-auto w-full">
            <EmbeddedYoutubeVideo videoID={postVideoID} />
        </div>
    );
}
