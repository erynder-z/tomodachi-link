import { useState } from 'react';
import { MinimalPostType } from '../../../../../types/postTypes';
import { ImageType } from '../../../../../types/miscTypes';
import PostItem from '../../../Post/PostItem/PostItem';
import LightBox from '../../../../UiElements/LightBox/LightBox';
import { AnimatePresence } from 'framer-motion';

type FeedPostListProps = {
    posts: MinimalPostType[];
    onPostChange: () => Promise<void>;
};

/**
 * FeedPostList component to display a list of posts in the feed.
 *
 * @component
 * @param {FeedPostListProps} props - The props object.
 * @param {MinimalPostType[]} props.posts - The array of minimal post data.
 * @param {() => Promise<void>} props.onPostChange - Function to handle post changes.
 * @returns {JSX.Element} The rendered FeedPostList component.
 */
export default function FeedPostList({
    posts,
    onPostChange,
}: FeedPostListProps): JSX.Element {
    const [clickedImage, setClickedImage] = useState<ImageType | null>(null);
    const [clickedGif, setClickedGif] = useState<string | null>(null);

    const showImageLightbox = !!clickedImage;
    const showGifLightbox = !!clickedGif;

    /**
     * Maps over the posts to create an array of PostItem components.
     *
     * @type {JSX.Element[]}
     */
    const HasFeedContent: JSX.Element[] = posts.map((post) => (
        <PostItem
            key={post._id}
            postID={post._id}
            setClickedImage={setClickedImage}
            setClickedGif={setClickedGif}
            onPostChange={onPostChange}
        />
    ));

    /**
     * Message to display when the feed is empty.
     *
     * @constant
     * @type {JSX.Element}
     */
    const EmptyFeedContent: JSX.Element = (
        <span className="text-sm font-medium text-center">
            Your feed is empty. Try adding some friends!
        </span>
    );

    /**
     * The main FeedPostList component.
     *
     * @returns {JSX.Element} The rendered FeedPostList component.
     */
    const FeedPostListContents =
        posts.length > 0 ? HasFeedContent : EmptyFeedContent;

    /**
     * The FeedPostList component. Shows lightbox elements when images are clicked.
     *
     * @returns {JSX.Element} The rendered FeedPostList component.
     */
    return (
        <div className="flex flex-col gap-4 pb-4">
            {FeedPostListContents}
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
