import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import useAuth from '../../../../../hooks/useAuth';
import useInfoCard from '../../../../../hooks/useInfoCard';
import { ImageType } from '../../../../../types/imageType';
import LoadingSpinner from '../../../../LoadingSpinner/LoadingSpinner';
import { fetchRecentPics } from '../../../../../utilities/fetchRecentPics';
import { convertImageToBase64 } from '../../../../../utilities/convertImageToBase64';
import LightBox from '../../../../LightBox/LightBox';
import { fetchNumberOfPics } from '../../../../../utilities/fetchNumberOfPics';
import { MdKeyboardDoubleArrowRight } from 'react-icons/md';

type PictureListProps = {
    userId: string | undefined;
};

export default function PictureList({ userId }: PictureListProps) {
    const { token } = useAuth();
    const { setInfo } = useInfoCard();
    const [pictures, setPictures] = useState<ImageType[]>([]);
    const [numberOfPicturess, setNumberOfPictures] = useState<number>(0);
    const [selectedImage, setSelectedImage] = useState<ImageType | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const handleFetchUserPics = async () => {
        if (token && userId) {
            const recentPicsResponse = await fetchRecentPics(
                token,
                userId,
                setInfo
            );
            const numberOfPicsResponse = await fetchNumberOfPics(
                token,
                userId,
                setInfo
            );
            setPictures([...recentPicsResponse]);
            setNumberOfPictures(numberOfPicsResponse);
            setLoading(false);
        }
    };

    const handleImageClick = (image: ImageType) => {
        setSelectedImage(image);
    };

    const handleShowAllButtonClick = () => {
        //
    };

    useEffect(() => {
        handleFetchUserPics();
    }, [userId]);

    const pictureList = pictures?.map((picture) => (
        <div key={uuidv4()}>
            <img
                className="w-20 h-auto aspect-square object-cover shadow-lg cursor-pointer"
                src={`data:image/png;base64,${convertImageToBase64(picture)}`}
                alt="User uploaded image"
                onClick={() => handleImageClick(picture)}
            />
        </div>
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
            {numberOfPicturess > 9 && (
                <button
                    onClick={handleShowAllButtonClick}
                    className="flex items-center justify-center md:justify-start gap-2 w-full md:w-fit  bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 mt-4 text-sm"
                >
                    See all <MdKeyboardDoubleArrowRight size="1.25em" />
                </button>
            )}
            {loading && (
                <div className="flex justify-center items-center w-full py-4 ">
                    <LoadingSpinner />
                </div>
            )}
            {selectedImage && (
                <LightBox
                    image={selectedImage}
                    onClose={() => setSelectedImage(null)}
                />
            )}
        </div>
    );
}
