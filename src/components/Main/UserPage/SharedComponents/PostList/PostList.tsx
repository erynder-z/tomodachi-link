import { useEffect, useRef, useState } from 'react';
import PostItem from '../../../Post/PostItem/PostItem';
import { PostType } from '../../../../../types/postTypes';
import useAuth from '../../../../../hooks/useAuth';
import useInfoCard from '../../../../../hooks/useInfoCard';
import LoadingSpinner from '../../../../UiElements/LoadingSpinner/LoadingSpinner';
import LightBox from '../../../../UiElements/LightBox/LightBox';
import { ImageType } from '../../../../../types/miscTypes';
import { motion, AnimatePresence } from 'framer-motion';
import { backendFetch } from '../../../../../utilities/backendFetch';

type MyPostListProps = {
    userId: string | undefined;
    isPaginationTriggered: boolean;
    onPostChange?: () => void;
    setShouldRefreshPictureList?: React.Dispatch<React.SetStateAction<boolean>>;
};

/**
 * React component for rendering a list of posts.
 *
 * @component
 * @param {object} props - The component props.
 * @param {string | undefined} props.userId - The ID of the user for whom the posts are being displayed.
 * @param {boolean} props.isPaginationTriggered - Indicates whether pagination is triggered.
 * @param {Function} [props.onPostChange] - Callback function triggered on post change.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} [props.setShouldRefreshPictureList] - State setter for refreshing the picture list.
 * @returns {JSX.Element} The rendered PostList component.
 */
export default function PostList({
    userId,
    isPaginationTriggered,
    onPostChange,
    setShouldRefreshPictureList,
}: MyPostListProps): JSX.Element {
    const { token, authUser } = useAuth();
    const { setInfo } = useInfoCard();
    const [posts, setPosts] = useState<PostType[]>([]);
    const [skip, setSkip] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [clickedImage, setClickedImage] = useState<ImageType | null>(null);
    const [clickedGif, setClickedGif] = useState<string | null>(null);

    const showImageLightbox = !!clickedImage;
    const showGifLightbox = !!clickedGif;

    const shouldInitialize = useRef(true);

    /**
     * Function to fetch posts from the backend.
     *
     * @function
     * @async
     * @returns {Promise<void>} A Promise that resolves once the posts are fetched.
     */
    const handleFetchPosts = async (): Promise<void> => {
        if (authUser && token && userId) {
            const apiEndpointURL = `/api/v1/users/${userId}/post?skip=${skip}`;
            const method = 'GET';
            const errorMessage = 'Unable to fetch posts!';
            const response = await backendFetch(
                token,
                setInfo,
                apiEndpointURL,
                method,
                errorMessage
            );
            setPosts([...posts, ...response.userPosts]);
            setLoading(false);
        }
    };

    /**
     * useEffect hook to update skip when isPaginationTriggered changes.
     *
     * @effect
     * @returns {void}
     */
    useEffect(() => {
        if (posts) setSkip(posts.length);
    }, [isPaginationTriggered]);

    /**
     * useEffect hook to fetch posts when skip or userId changes.
     *
     * @effect
     * @returns {void}
     */
    useEffect(() => {
        if (skip && userId) handleFetchPosts();
    }, [skip, userId]);

    /**
     * useEffect hook to initialize the component and fetch posts on mount.
     *
     * @effect
     * @returns {void}
     */
    useEffect(() => {
        if (userId && shouldInitialize.current) {
            handleFetchPosts();
            shouldInitialize.current = false;
        }
    }, [userId]);

    /**
     * Map posts to PostItem components.
     *
     * @type {JSX.Element[]}
     */
    const postItemsList: JSX.Element[] = posts?.map((post) => (
        <PostItem
            key={post._id}
            postID={post._id}
            setClickedImage={setClickedImage}
            setClickedGif={setClickedGif}
            onPostChange={onPostChange}
            setShouldRefreshPictureList={setShouldRefreshPictureList}
        />
    ));

    /**
     * JSX Element representing the content of the PostList component.
     *
     * @type {JSX.Element[] | JSX.Element | string}
     */
    const PostListContent: JSX.Element[] | JSX.Element | string =
        postItemsList.length > 0 ? (
            postItemsList
        ) : loading ? (
            ''
        ) : (
            <span className="text-sm font-medium text-center">
                Nothing to show yet!
            </span>
        );

    /**
     * JSX Element representing the loading content.
     *
     * @type {JSX.Element}
     */
    const LoadingContent: JSX.Element = (
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

    /**
     * Render the PostList component.
     *
     * @type {JSX.Element}
     */
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
