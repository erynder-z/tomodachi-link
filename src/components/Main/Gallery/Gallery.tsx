import { useEffect, useRef, useState } from 'react';
import { ImageType } from '../../../types/miscTypes';
import useAuth from '../../../hooks/useAuth';
import useInfoCard from '../../../hooks/useInfoCard';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../../UiElements/LoadingSpinner/LoadingSpinner';
import LightBox from '../../UiElements/LightBox/LightBox';
import { MdOutlineZoomIn } from 'react-icons/md';
import { backendFetch } from '../../../utilities/backendFetch';
import { motion, AnimatePresence } from 'framer-motion';
import { displayErrorInfo } from '../../UiElements/UserNotification/displayErrorInfo';

type GalleryProps = {
    isPaginationTriggered: boolean;
};

export default function Gallery({ isPaginationTriggered }: GalleryProps) {
    const params = useParams();
    const id: string | undefined = params.id;
    const { token } = useAuth();
    const { setInfo } = useInfoCard();
    const [skip, setSkip] = useState<number | null>(null);
    const [pictures, setPictures] = useState<ImageType[]>([]);
    const [numberOfPictures, setNumberOfPictures] = useState<number>(0);
    const [selectedImage, setSelectedImage] = useState<ImageType | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const showLightbox = selectedImage ? true : false;

    const shouldInitialize = useRef(true);

    const handleFetchUserPics = async () => {
        if (!token || !id) return;

        const API_ENDPOINT_URL_LIST = `/api/v1/users/${id}/picture?skip=${skip}`;
        const API_ENDPOINT_URL_COUNT = `/api/v1/users/${id}/count_pictures`;
        const METHOD = 'GET';
        const ERROR_MESSAGE_LIST = 'Unable to fetch pictures!';
        const ERROR_MESSAGE_COUNT = 'Unable to fetch number of pictures!';

        try {
            const [picListRes, countPicRes] = await Promise.all([
                backendFetch(
                    token,
                    setInfo,
                    API_ENDPOINT_URL_LIST,
                    METHOD,
                    ERROR_MESSAGE_LIST
                ),
                backendFetch(
                    token,
                    setInfo,
                    API_ENDPOINT_URL_COUNT,
                    METHOD,
                    ERROR_MESSAGE_COUNT
                ),
            ]);

            if (picListRes && countPicRes) {
                setPictures([...pictures, ...picListRes.images]);
                setNumberOfPictures(countPicRes?.count);
                setLoading(false);
            }
        } catch (error) {
            displayErrorInfo(setInfo, 'Unable to fetch pictures!', '👻');
        }
    };

    const handleImageClick = (image: ImageType) => setSelectedImage(image);

    useEffect(() => {
        if (pictures) setSkip(pictures.length);
    }, [isPaginationTriggered, numberOfPictures]);

    useEffect(() => {
        if (skip) handleFetchUserPics();
    }, [skip]);

    useEffect(() => {
        if (shouldInitialize.current) {
            handleFetchUserPics();
        }
        return () => {
            shouldInitialize.current = false;
        };
    }, []);

    const pictureList = pictures?.map((picture) => (
        <motion.div
            key={picture.id}
            whileTap={{ scale: 0.97 }}
            className="relative"
        >
            <img
                loading="lazy"
                className="w-full h-auto aspect-square object-cover shadow-lg cursor-pointer"
                src={`data:image/png;base64,${picture?.data}`}
                alt="User uploaded image"
            />
            <div
                onClick={() => handleImageClick(picture)}
                className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
            >
                <span className="text-regularTextDark text-lg font-bold">
                    <MdOutlineZoomIn size="1.5em" />
                </span>
            </div>
        </motion.div>
    ));

    const LoadingContent = (
        <div className="flex flex-col justify-center items-center h-screen w-full py-4 bg-background2 dark:bg-background2Dark text-regularText dark:text-regularTextDark ">
            <span>Getting pictures</span>
            <LoadingSpinner />
        </div>
    );

    const GalleryContent = (
        <div className="flex flex-col min-h-[calc(100vh_-_5rem)] lg:min-h-full lg:p-4 md:p-0 pb-4 bg-card dark:bg-cardDark text-regularText dark:text-regularTextDark shadow-lg">
            <h1 className="font-bold">{numberOfPictures} Pictures</h1>
            <div className="flex flex-col md:grid grid-cols-3 gap-4">
                {pictureList}
            </div>
        </div>
    );

    return (
        <div className="flex flex-col justify-center items-center w-full">
            {loading ? LoadingContent : GalleryContent}
            <AnimatePresence>
                {showLightbox && (
                    <LightBox
                        image={selectedImage}
                        onClose={() => setSelectedImage(null)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
