import React from 'react';
import './EmbeddedYoutubeVideo.css';

type EmbeddedYoutubeVideoProps = {
    videoID: string;
};

export const EmbeddedYoutubeVideo = ({
    videoID,
}: EmbeddedYoutubeVideoProps) => {
    return (
        <div className="relative h-0 overflow-hidden w-full pb-youtube">
            <iframe
                className="absolute inset-0 w-full h-full"
                title={`YouTube Video ${videoID}`}
                src={`https://www.youtube.com/embed/${videoID}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />
        </div>
    );
};
