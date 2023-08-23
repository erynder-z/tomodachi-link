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
    return posts.length > 0 ? (
        posts.map((post) => (
            <PostItem
                key={post._id}
                postID={post._id}
                setClickedImage={setClickedImage}
                setClickedGif={setClickedGif}
            />
        ))
    ) : (
        <span className="text-sm font-medium text-center">
            Your feed is empty. Try adding some friends!
        </span>
    );
}
