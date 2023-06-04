import React, { useEffect, useState } from 'react';
import useAuth from '../../../../hooks/useAuth';
import useInfoCard from '../../../../hooks/useInfoCard';
import { fetchFeed } from '../../../../utilities/fetchFeed';
import LoadingSpinner from '../../../LoadingSpinner/LoadingSpinner';
import PostItem from '../../PostItem/PostItem';
import LightBox from '../../../LightBox/LightBox';
import { ImageType } from '../../../../types/imageType';
import ShowPeopleInThisFeed from '../ShowPeopleInThisFeed/ShowPeopleInThisFeed';
import { MinimalPostType } from '../../../../types/minimalPostType';
import useDelayUnmount from '../../../../hooks/useDelayUnmount';

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
    const [minimalPosts, setMinimalPosts] = useState<MinimalPostType[]>([]);
    const [skip, setSkip] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [clickedImage, setClickedImage] = useState<ImageType | null>(null);
    const [clickedGif, setClickedGif] = useState<string | null>(null);

    const isImageLightboxMounted = clickedImage ? true : false;
    const showImageLightbox = useDelayUnmount(isImageLightboxMounted, 150);

    const isGifLightboxMounted = clickedGif ? true : false;
    const showGifLightbox = useDelayUnmount(isGifLightboxMounted, 150);

    const handleGetFeed = async () => {
        if (authUser && token) {
            const response = await fetchFeed(token, setInfo, skip, friendList);
            setMinimalPosts([...minimalPosts, ...response]);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (minimalPosts) {
            setSkip(minimalPosts.length);
        }
    }, [isPaginationTriggered]);

    useEffect(() => {
        if (token) {
            handleGetFeed();
        }
    }, [skip]);

    const postItemsList = minimalPosts?.map((post) => (
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
        <div className="flex flex-col h-1/4 md:h-auto w-full gap-8 ">
            <div className="flex flex-col md:grid grid-cols-[1fr,2fr] gap-8 bg-card">
                <ShowPeopleInThisFeed
                    friendList={friendList}
                    minimalPosts={minimalPosts}
                />
                <div className="flex flex-col gap-4 pb-4">
                    {postItemsList.length > 0 ? (
                        postItemsList
                    ) : (
                        <span className="text-sm font-medium text-center">
                            Your feed is empty. Try adding some friends!
                        </span>
                    )}
                    {loading && (
                        <div className="flex justify-center items-center w-full py-4 ">
                            <LoadingSpinner />
                        </div>
                    )}
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
                </div>
            </div>
        </div>
    );
}
