import { useState } from 'react';
import { MinimalPostType } from '../../../../../types/postTypes';
import { ImageType } from '../../../../../types/miscTypes';
import PostItem from '../../../Post/PostItem/PostItem';
import LoadingSpinner from '../../../../UiElements/LoadingSpinner/LoadingSpinner';
import LightBox from '../../../../UiElements/LightBox/LightBox';
import { AnimatePresence } from 'framer-motion';

type FeedPostListProps = {
    posts: MinimalPostType[];
    isFeedRefreshing: boolean;
    onPostChange: () => Promise<void>;
};

export default function FeedPostList({
    posts,
    isFeedRefreshing,
    onPostChange,
}: FeedPostListProps) {
    const [clickedImage, setClickedImage] = useState<ImageType | null>(null);
    const [clickedGif, setClickedGif] = useState<string | null>(null);

    const showImageLightbox = !!clickedImage;
    const showGifLightbox = !!clickedGif;

    const HasFeedContent = posts.map((post) => (
        <PostItem
            key={post._id}
            postID={post._id}
            setClickedImage={setClickedImage}
            setClickedGif={setClickedGif}
            onPostChange={onPostChange}
        />
    ));

    const EmptyFeedContent = (
        <span className="text-sm font-medium text-center">
            Your feed is empty. Try adding some friends!
        </span>
    );

    const LoadingContent = (
        <div className="flex justify-center items-center h-full w-full py-4">
            <LoadingSpinner message="Refreshing feed" />
        </div>
    );

    const FeedPostListContents =
        posts.length > 0 ? HasFeedContent : EmptyFeedContent;

    return (
        <div className="flex flex-col gap-4 pb-4">
            {isFeedRefreshing ? LoadingContent : FeedPostListContents}
            <AnimatePresence>
                {showImageLightbox && (
                    <LightBox
                        image={clickedImage}
                        onClose={() => setClickedImage(null)}
                    />
                )}
                {showGifLightbox && (
                    <LightBox
                        image={clickedGif}
                        onClose={() => setClickedGif(null)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
