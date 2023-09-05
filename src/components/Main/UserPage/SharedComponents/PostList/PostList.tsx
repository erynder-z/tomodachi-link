import React, { useEffect, useState } from 'react';
import PostItem from '../../../Post/PostItem/PostItem';
import { PostType } from '../../../../../types/postType';
import useAuth from '../../../../../hooks/useAuth';
import useInfoCard from '../../../../../hooks/useInfoCard';
import LoadingSpinner from '../../../../UiElements/LoadingSpinner/LoadingSpinner';
import { fetchPosts } from '../../../../../utilities/fetchPosts';
import LightBox from '../../../../UiElements/LightBox/LightBox';
import { ImageType } from '../../../../../types/imageType';
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
    const [skip, setSkip] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [clickedImage, setClickedImage] = useState<ImageType | null>(null);
    const [clickedGif, setClickedGif] = useState<string | null>(null);

    const isImageLightboxMounted = clickedImage ? true : false;
    const showImageLightbox = useDelayUnmount(isImageLightboxMounted, 150);

    const isGifLightboxMounted = clickedGif ? true : false;
    const showGifLightbox = useDelayUnmount(isGifLightboxMounted, 150);

    const handleFetchPosts = async () => {
        if (authUser && token && userId) {
            const response = await fetchPosts(userId, token, setInfo, skip);
            setPosts([...posts, ...response]);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (posts) {
            setSkip(posts.length);
        }
    }, [isPaginationTriggered]);

    useEffect(() => {
        if (userId) {
            handleFetchPosts();
        }
    }, [skip, userId]);

    const postItemsList = posts?.map((post) => (
        <PostItem
            key={post._id}
            postID={post._id}
            setClickedImage={setClickedImage}
            setClickedGif={setClickedGif}
            onPostChange={onPostChange}
        />
    ));

    return (
        <div className="flex flex-col gap-4 pb-4 ">
            {postItemsList.length > 0 ? (
                postItemsList
            ) : (
                <span className="text-sm font-medium text-center">
                    Your posts will appear here
                </span>
            )}
            {loading && (
                <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex justify-center items-center w-full py-4 "
                >
                    <LoadingSpinner />
                </motion.div>
            )}
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
