import React, { useEffect, useState } from 'react';
import PostItem from '../../../../PostItem/PostItem';
import { PostType } from '../../../../../../types/postType';
import useAuth from '../../../../../../hooks/useAuth';
import useInfoOverlay from '../../../../../../hooks/useInfoOverlay';
import LoadingSpinner from '../../../../../LoadingSpinner/LoadingSpinner';
import { fetchOtherPosts } from '../../../../../../utilities/fetchOtherPosts';
import { useParams } from 'react-router-dom';

type OtherPostListProps = {
    isPaginationTriggered: boolean;
};

export default function OtherPostList({
    isPaginationTriggered,
}: OtherPostListProps) {
    const params = useParams();
    const id: string | undefined = params.id;
    const { token, authUser } = useAuth();
    const { setInfo } = useInfoOverlay();
    const [posts, setPosts] = useState<PostType[]>([]);
    const [skip, setSkip] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);

    const handleFetchUserPosts = async () => {
        if (authUser && token) {
            const response = await fetchOtherPosts(id, token, setInfo, skip);
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
        handleFetchUserPosts();
    }, [skip]);

    const postItemsList = posts?.map((post) => (
        <PostItem key={post._id} postID={post._id} />
    ));

    return (
        <div className="flex flex-col gap-4">
            {postItemsList.length > 0 ? (
                postItemsList
            ) : (
                <span className="text-sm font-medium text-center">
                    Your posts will appear here
                </span>
            )}
            {loading && (
                <div className="flex justify-center items-center w-full py-4 ">
                    <LoadingSpinner />
                </div>
            )}
        </div>
    );
}
