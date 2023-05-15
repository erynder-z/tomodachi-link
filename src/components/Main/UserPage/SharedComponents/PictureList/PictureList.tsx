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
import {
    MdKeyboardDoubleArrowLeft,
    MdKeyboardDoubleArrowRight,
} from 'react-icons/md';

type PictureListProps = {
    userId: string | undefined;
};

export default function PictureList({ userId }: PictureListProps) {
    const { token } = useAuth();
    const { setInfo } = useInfoCard();
    const [pictures, setPictures] = useState<ImageType[]>([]);
    const [numberOfPictures, setNumberOfPictures] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [selectedImage, setSelectedImage] = useState<ImageType | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const handleFetchUserPics = async (page: number) => {
        if (token && userId) {
            setLoading(true);
            const pictureListResponse = await fetchPictureList(
                token,
                userId,
                page,
                setInfo
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

    const handlePreviousPageButtonClick = () => {
        setCurrentPage((prevPage) => prevPage - 1);
    };

    const handleNextPageButtonClick = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    useEffect(() => {
        handleFetchUserPics(currentPage);
    }, [userId, currentPage]);

    const startIndex = 0;
    const endIndex = 9;
    const maxPerPage = 9;
    const totalPages = Math.ceil(numberOfPictures / maxPerPage);

    const pictureList = pictures.slice(startIndex, endIndex).map((picture) => (
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
                    loading ? (
                        <div className="col-span-3 flex justify-center items-center w-full py-4 ">
                            <LoadingSpinner />
                        </div>
                    ) : (
                        pictureList
                    )
                ) : (
                    <span className="text-sm font-medium text-center">
                        Nothing here yet
                    </span>
                )}
            </div>
            {numberOfPictures > 9 && (
                <div className="flex justify-center items-center gap-16 bg-blue-500 mt-4">
                    <button
                        onClick={handlePreviousPageButtonClick}
                        disabled={totalPages > currentPage}
                        className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white p-1 text-xs "
                    >
                        <MdKeyboardDoubleArrowLeft
                            size="1.25em"
                            style={{
                                opacity: totalPages > currentPage ? 0.5 : 1,
                            }}
                        />
                    </button>

                    <button
                        onClick={handleNextPageButtonClick}
                        disabled={currentPage === totalPages}
                        className="flex items-center justify-center gap-2  bg-blue-500 hover:bg-blue-600 text-white p-1 text-xs "
                    >
                        <MdKeyboardDoubleArrowRight
                            size="1.25em"
                            style={{
                                opacity: currentPage === totalPages ? 0.5 : 1,
                            }}
                        />
                    </button>
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
