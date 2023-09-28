import React from 'react';
import { MinimalPostType } from '../../../../../types/minimalPostType';
import PostItem from '../../../Post/PostItem/PostItem';
import { ImageType } from '../../../../../types/imageType';
import LoadingSpinner from '../../../../UiElements/LoadingSpinner/LoadingSpinner';

type FeedPostListProps = {
    posts: MinimalPostType[];
    setClickedImage: React.Dispatch<React.SetStateAction<ImageType | null>>;
    setClickedGif: React.Dispatch<React.SetStateAction<string | null>>;
    isFeedRefreshing: boolean;
    onPostChange: () => Promise<void>;
};

export default function FeedPostList({
    posts,
    setClickedImage,
    setClickedGif,
    isFeedRefreshing,
    onPostChange,
}: FeedPostListProps) {
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

    return isFeedRefreshing ? LoadingContent : FeedPostListContents;
}
