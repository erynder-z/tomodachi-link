import React, { useEffect, useState } from 'react';
import useAuth from '../../../../hooks/useAuth';
import useInfoCard from '../../../../hooks/useInfoCard';
import { PostType } from '../../../../types/postType';
import { fetchFeed } from '../../../../utilities/fetchFeed';
import LoadingSpinner from '../../../LoadingSpinner/LoadingSpinner';
import PostItem from '../../PostItem/PostItem';
import LightBox from '../../../LightBox/LightBox';
import { ImageType } from '../../../../types/imageType';

type FreedProps = {
    friendList: string[];
    isPaginationTriggered: boolean;
};

export default function Feed({
    friendList,
    isPaginationTriggered,
}: FreedProps) {
    const { token, authUser } = useAuth();
    const { setInfo } = useInfoCard();
    const [posts, setPosts] = useState<PostType[]>([]);
    const [skip, setSkip] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [clickedImage, setClickedImage] = useState<ImageType | null>(null);
    const [clickedGif, setClickedGif] = useState<string | null>(null);

    const handleGetFeed = async () => {
        if (authUser && token) {
            const response = await fetchFeed(token, setInfo, skip, friendList);
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
        if (token) {
            handleGetFeed();
        }
    }, [skip]);

    const postItemsList = posts?.map((post) => (
        <PostItem
            key={post._id}
            postID={post._id}
            setClickedImage={setClickedImage}
            setClickedGif={setClickedGif}
        />
    ));

    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center w-full h-full py-4 bg-card ">
                <h1 className="font-bold">Getting feed...</h1>
                <LoadingSpinner />
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4 pb-4">
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
            {clickedImage && (
                <LightBox
                    image={clickedImage}
                    onClose={() => setClickedImage(null)}
                />
            )}
            {clickedGif && (
                <LightBox
                    image={clickedGif}
                    onClose={() => setClickedGif(null)}
                />
            )}
        </div>
    );
}
