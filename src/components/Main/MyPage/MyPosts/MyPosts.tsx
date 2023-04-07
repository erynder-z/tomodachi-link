import React, { useEffect, useState } from 'react';
import PostItem from '../../PostItem/PostItem';
import { PostType } from '../../../../types/postType';
import useAuth from '../../../../hooks/useAuth';
import useInfoOverlay from '../../../../hooks/useInfoOverlay';
import { fetchUserPosts } from '../../../../utilities/fetchUserPosts';
import LoadingSpinner from '../../../LoadingSpinner/LoadingSpinner';

export default function MyPosts() {
    const { token, authUser } = useAuth();
    const { setInfo } = useInfoOverlay();
    const [posts, setPosts] = useState<PostType[]>([]);
    const [skip, setSkip] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [lastTouchY, setLastTouchY] = useState<number | null>(null);

    const handleFetchUserPosts = async () => {
        if (authUser && token) {
            setLoading(true);
            await fetchUserPosts(token, setPosts, setInfo, posts, skip);
            setLoading(false);
        }
    };

    // handle infinite scrolling on desktop devices
    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;

        if (scrollTop + clientHeight >= scrollHeight - 1) {
            if (posts) {
                setSkip(posts.length);
            }
        }
    };

    // handle infinite scrolling on touch devices
    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        const touchY = e.touches[0].clientY;
        const target = e.currentTarget;

        if (lastTouchY && touchY > lastTouchY && target.scrollTop === 0) {
            if (posts) {
                setSkip(posts.length);
            }
        }

        setLastTouchY(touchY);
    };

    useEffect(() => {
        handleFetchUserPosts();
    }, [skip]);

    /*    useEffect(() => {
        handleFetchUserPosts();
    }, []); */

    const postItemsList = posts?.map((post) => (
        <PostItem key={post._id} postID={post._id} />
    ));

    return (
        <div
            onScroll={handleScroll}
            onTouchMove={handleTouchMove}
            className="flex flex-col gap-4 overflow-auto"
        >
            {postItemsList}
            {loading && (
                <div className="flex justify-center items-center w-full py-4 ">
                    <LoadingSpinner />
                </div>
            )}
        </div>
    );
}
