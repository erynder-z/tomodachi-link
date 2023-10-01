import { useEffect, useRef, useState } from 'react';
import PostItem from '../../../Post/PostItem/PostItem';
import { PostType } from '../../../../../types/postTypes';
import useAuth from '../../../../../hooks/useAuth';
import useInfoCard from '../../../../../hooks/useInfoCard';
import LoadingSpinner from '../../../../UiElements/LoadingSpinner/LoadingSpinner';
import { fetchPosts } from '../../../../../utilities/fetchPosts';
import LightBox from '../../../../UiElements/LightBox/LightBox';
import { ImageType } from '../../../../../types/miscTypes';
import useDelayUnmount from '../../../../../hooks/useDelayUnmount';
import { motion, AnimatePresence } from 'framer-motion';

type MyPostListProps = {
    userId: string | undefined;
    isPaginationTriggered: boolean;
    onPostChange?: () => void;
};

export default function PostList({
    userId,
    isPaginationTriggered,
    onPostChange,
}: MyPostListProps) {
    const { token, authUser } = useAuth();
    const { setInfo } = useInfoCard();
    const [posts, setPosts] = useState<PostType[]>([]);
    const [skip, setSkip] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [clickedImage, setClickedImage] = useState<ImageType | null>(null);
    const [clickedGif, setClickedGif] = useState<string | null>(null);

    const isImageLightboxMounted = clickedImage ? true : false;
    const showImageLightbox = useDelayUnmount(isImageLightboxMounted, 150);

    const isGifLightboxMounted = clickedGif ? true : false;
    const showGifLightbox = useDelayUnmount(isGifLightboxMounted, 150);

    const shouldInitialize = useRef(true);

    const handleFetchPosts = async () => {
        if (authUser && token && userId) {
            const response = await fetchPosts(userId, token, setInfo, skip);
            setPosts([...posts, ...response]);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (posts) setSkip(posts.length);
    }, [isPaginationTriggered]);

    useEffect(() => {
        if (skip && userId) handleFetchPosts();
    }, [skip, userId]);

    useEffect(() => {
        if (userId && shouldInitialize.current) {
            handleFetchPosts();
            shouldInitialize.current = false;
        }
    }, [userId]);

    const postItemsList = posts?.map((post) => (
        <PostItem
            key={post._id}
            postID={post._id}
            setClickedImage={setClickedImage}
            setClickedGif={setClickedGif}
            onPostChange={onPostChange}
        />
    ));

    const PostListContent =
        postItemsList.length > 0 ? (
            postItemsList
        ) : (
            <span className="text-sm font-medium text-center">
                Nothing to show yet!
            </span>
        );

    const LoadingContent = (
        <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex justify-center items-center w-full py-4 "
        >
            <LoadingSpinner />
        </motion.div>
    );

    return (
        <div className="flex flex-col gap-4 pb-4 ">
            {PostListContent}
            {loading && LoadingContent}
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
