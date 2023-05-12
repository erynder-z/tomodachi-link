import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import useAuth from '../../../../../hooks/useAuth';
import useInfoCard from '../../../../../hooks/useInfoCard';
import { ImageType } from '../../../../../types/imageType';
import LoadingSpinner from '../../../../LoadingSpinner/LoadingSpinner';
import { fetchOwnRecentPics } from '../../../../../utilities/fetchOwnRecentPics';
import { convertImageToBase64 } from '../../../../../utilities/convertImageToBase64';

export default function MyPictureList() {
    const { token, authUser } = useAuth();
    const { setInfo } = useInfoCard();
    const [pictures, setPictures] = useState<ImageType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const handleFetchUserPics = async () => {
        if (authUser && token) {
            const id = authUser.user._id;
            const response = await fetchOwnRecentPics(token, id, setInfo);

            setPictures([...response]);
            setLoading(false);
        }
    };

    useEffect(() => {
        handleFetchUserPics();
    }, []);

    const pictureList = pictures?.map((picture) => (
        <img
            key={uuidv4()}
            className="w-full h-auto object-contain shadow-lg"
            src={`data:image/png;base64,${convertImageToBase64(picture)}`}
            alt="User uploaded image"
        />
    ));

    return (
        <div>
            <h1>Pictures</h1>

            <div className="grid grid-cols-3 gap-2">
                {pictureList.length > 0 ? (
                    pictureList
                ) : (
                    <span className="text-sm font-medium text-center">
                        Nothing here yet
                    </span>
                )}
            </div>
            <span>See all pics</span>
            {loading && (
                <div className="flex justify-center items-center w-full py-4 ">
                    <LoadingSpinner />
                </div>
            )}
        </div>
    );
}
