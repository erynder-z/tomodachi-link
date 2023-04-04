import React, { useEffect, useState } from 'react';
import PostItem from '../../PostItem/PostItem';
import { PostType } from '../../../../types/postType';
import useAuth from '../../../../hooks/useAuth';
import useInfoOverlay from '../../../../hooks/useInfoOverlay';
import { fetchUserPosts } from '../../../../utilities/fetchUserPosts';

export default function MyPosts() {
    const { token, authUser } = useAuth();
    const { setInfo } = useInfoOverlay();
    const [posts, setPosts] = useState<PostType[] | null>(null);

    const handleFetchUserPosts = () => {
        if (authUser && token) {
            fetchUserPosts(token, setPosts, setInfo);
        }
    };

    useEffect(() => {
        handleFetchUserPosts();
    }, []);

    const postItemsList = posts?.map((post) => (
        <PostItem key={post._id} postContent={post} />
    ));

    return <div className="flex flex-col gap-4">{postItemsList}</div>;
}
