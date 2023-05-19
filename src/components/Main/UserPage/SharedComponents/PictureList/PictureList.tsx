import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import useAuth from '../../../../../hooks/useAuth';
import useInfoCard from '../../../../../hooks/useInfoCard';
import { ImageType } from '../../../../../types/imageType';
import LoadingSpinner from '../../../../LoadingSpinner/LoadingSpinner';
import { fetchPictureList } from '../../../../../utilities/fetchPictureList';
import { convertImageToBase64 } from '../../../../../utilities/convertImageToBase64';
import LightBox from '../../../../LightBox/LightBox';
import { fetchNumberOfPics } from '../../../../../utilities/fetchNumberOfPics';
import { MdKeyboardDoubleArrowRight, MdOutlineZoomIn } from 'react-icons/md';
import { Link } from 'react-router-dom';

type PictureListProps = {
    userId: string | undefined;
};

export default function PictureList({ userId }: PictureListProps) {
    const { token } = useAuth();
    const { setInfo } = useInfoCard();
    const [pictures, setPictures] = useState<ImageType[]>([]);
    const [numberOfPictures, setNumberOfPictures] = useState<number>(0);
    const [selectedImage, setSelectedImage] = useState<ImageType | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const handleFetchUserPics = async () => {
        if (token && userId) {
            const pictureListResponse = await fetchPictureList(
                userId,
                token,
                setInfo,
                0 // skip 0 since only the most recent pictures are fetched
            );
            const numberOfPicsResponse = await fetchNumberOfPics(
                token,
                userId,
                setInfo
            );
            setPictures([...pictureListResponse]);
            setNumberOfPictures(numberOfPicsResponse);
            setLoading(false);
        }
    };

    const handleImageClick = (image: ImageType) => {
        setSelectedImage(image);
    };

    useEffect(() => {
        handleFetchUserPics();
    }, [userId]);

    const pictureList = pictures?.map((picture) => (
        <div key={uuidv4()} className="relative">
            <img
                className="w-20 h-auto aspect-square object-cover shadow-lg cursor-pointer "
                src={`data:image/png;base64,${convertImageToBase64(picture)}`}
                alt="User uploaded image"
            />
            <div
                onClick={() => handleImageClick(picture)}
                className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
            >
                <span className="text-white text-lg font-bold">
                    <MdOutlineZoomIn size="1.5em" />
                </span>
            </div>
        </div>
    ));

    return (
        <div>
            <h1 className="font-bold">Pictures</h1>

            <div className="grid grid-cols-3 gap-2">
                {pictureList.length > 0 ? (
                    pictureList
                ) : (
                    <span className="col-span-3 text-sm font-medium">
                        Nothing here yet
                    </span>
                )}
            </div>
            {numberOfPictures > 9 && (
                <Link
                    to={`/users/${userId}/gallery`}
                    className="flex items-center justify-center md:justify-start gap-2 w-full md:w-fit  bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 mt-4 text-sm"
                >
                    See all <MdKeyboardDoubleArrowRight size="1.25em" />
                </Link>
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
