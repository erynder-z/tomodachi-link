import React from 'react';
import { MinimalPostType } from '../../../../../types/minimalPostType';
import PostItem from '../../../Post/PostItem/PostItem';
import { ImageType } from '../../../../../types/imageType';

type FeedPostListProps = {
    posts: MinimalPostType[];
    setClickedImage: React.Dispatch<React.SetStateAction<ImageType | null>>;
    setClickedGif: React.Dispatch<React.SetStateAction<string | null>>;
};

export default function FeedPostList({
    posts,
    setClickedImage,
    setClickedGif,
}: FeedPostListProps) {
    const HasFeedContent = posts.map((post) => (
        <PostItem
            key={post._id}
            postID={post._id}
            setClickedImage={setClickedImage}
            setClickedGif={setClickedGif}
        />
    ));

    const EmptyFeedContent = (
        <span className="text-sm font-medium text-center">
            Your feed is empty. Try adding some friends!
        </span>
    );

    return posts.length > 0 ? HasFeedContent : EmptyFeedContent;
}
