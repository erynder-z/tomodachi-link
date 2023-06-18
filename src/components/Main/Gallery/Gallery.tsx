import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { CurrentViewType } from '../../../types/currentViewType';
import { ImageType } from '../../../types/imageType';
import useAuth from '../../../hooks/useAuth';
import useInfoCard from '../../../hooks/useInfoCard';
import { useParams } from 'react-router-dom';
import { fetchPictureList } from '../../../utilities/fetchPictureList';
import { fetchNumberOfPics } from '../../../utilities/fetchNumberOfPics';
import { convertImageToBase64 } from '../../../utilities/convertImageToBase64';
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner';
import LightBox from '../../LightBox/LightBox';
import { MdOutlineZoomIn } from 'react-icons/md';
import useDelayUnmount from '../../../hooks/useDelayUnmount';

type GalleryProps = {
    setCurrentView: React.Dispatch<React.SetStateAction<CurrentViewType>>;
    isPaginationTriggered: boolean;
};

export default function Gallery({
    setCurrentView,
    isPaginationTriggered,
}: GalleryProps) {
    const params = useParams();
    const id: string | undefined = params.id;
    const { token } = useAuth();
    const { setInfo } = useInfoCard();
    const [skip, setSkip] = useState<number>(0);
    const [pictures, setPictures] = useState<ImageType[]>([]);
    const [numberOfPictures, setNumberOfPictures] = useState<number>(0);
    const [selectedImage, setSelectedImage] = useState<ImageType | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const isLightboxMounted = selectedImage ? true : false;
    const showLightbox = useDelayUnmount(isLightboxMounted, 150);

    const handleFetchUserPics = async () => {
        if (token && id) {
            const pictureListResponse = await fetchPictureList(
                id,
                token,
                setInfo,
                skip
            );
            const numberOfPicsResponse = await fetchNumberOfPics(
                token,
                id,
                setInfo
            );
            setPictures([...pictures, ...pictureListResponse]);
            setNumberOfPictures(numberOfPicsResponse);
            setLoading(false);
        }
    };

    const handleImageClick = (image: ImageType) => {
        setSelectedImage(image);
    };

    useEffect(() => {
        if (pictures) {
            setSkip(pictures.length);
        }
    }, [isPaginationTriggered]);

    useEffect(() => {
        if (id) {
            handleFetchUserPics();
        }
    }, [skip, id]);

    useEffect(() => {
        setCurrentView('Gallery');
        localStorage.setItem('currentView', 'Gallery');
    }, []);

    const pictureList = pictures?.map((picture) => (
        <div key={uuidv4()} className="relative">
            <img
                loading="lazy"
                className="w-full h-auto aspect-square object-cover shadow-lg cursor-pointer"
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
        <div className="flex flex-col justify-center items-center w-full">
            {loading ? (
                <div className="flex flex-col justify-center items-center h-screen w-full py-4 ">
                    <span>Getting pictures</span>
                    <LoadingSpinner />
                </div>
            ) : (
                <div className="flex flex-col min-h-[calc(100vh_-_5rem)] lg:min-h-full lg:p-4 md:p-0 pb-4 bg-canvas shadow-lg">
                    <h1 className="font-bold">{numberOfPictures} Pictures</h1>
                    <div className="flex flex-col md:grid grid-cols-3 gap-4">
                        {pictureList}
                    </div>
                </div>
            )}

            {showLightbox && (
                <LightBox
                    image={selectedImage}
                    onClose={() => setSelectedImage(null)}
                />
            )}
        </div>
    );
}
