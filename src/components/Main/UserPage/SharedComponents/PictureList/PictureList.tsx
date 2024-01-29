import { useEffect, useRef, useState } from 'react';
import useAuth from '../../../../../hooks/useAuth';
import useInfoCard from '../../../../../hooks/useInfoCard';
import { ImageType } from '../../../../../types/miscTypes';
import LoadingSpinner from '../../../../UiElements/LoadingSpinner/LoadingSpinner';
import LightBox from '../../../../UiElements/LightBox/LightBox';
import { MdKeyboardDoubleArrowRight, MdZoomOutMap } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { backendFetch } from '../../../../../utilities/backendFetch';
import { motion } from 'framer-motion';

type PictureListProps = {
    onFetchComplete: (nameOfComponent: string) => void;
    userId: string | undefined;
};

/**
 * React component for displaying a list of user pictures.
 *
 * @component
 * @param {PictureListProps} props - The component props.
 * @param {(nameOfComponent: string) => void} props.onFetchComplete - Callback function invoked when the fetch operation is complete.
 * @param {string | undefined} props.userId - The user ID for whom the pictures are being fetched.
 * @returns {JSX.Element} The rendered PictureList component.
 */
export default function PictureList({
    onFetchComplete,
    userId,
}: PictureListProps): JSX.Element {
    const { token } = useAuth();
    const { setInfo } = useInfoCard();
    const [pictures, setPictures] = useState<ImageType[]>([]);
    const [numberOfPictures, setNumberOfPictures] = useState<number>(0);
    const [selectedImage, setSelectedImage] = useState<ImageType | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const shouldInitialize = useRef(true);

    const MAX_NUMBER_OF_PICTURES_TO_SHOW = 9;

    /**
     * Handles fetching user pictures from the backend.
     *
     * @function
     * @async
     * @returns {Promise<void>} A Promise that resolves once the pictures are fetched.
     */
    const handleFetchUserPics = async (): Promise<void> => {
        if (token && userId) {
            const skip = 0;
            const apiEndpointURLList = `/api/v1/users/${userId}/picture?skip=${skip}`;
            const apiEndpointURLNumber = `/api/v1/users/${userId}/count_pictures`;
            const METHOD = 'GET';
            const ERROR_MESSAGE_LIST = 'Unable to fetch pictures!';
            const ERROR_MESSAGE_NUMBER = 'Unable to fetch number of pictures!';
            let pictureListResponse;
            let numberOfPicsResponse;
            try {
                pictureListResponse = await backendFetch(
                    token,
                    setInfo,
                    apiEndpointURLList,
                    METHOD,
                    ERROR_MESSAGE_LIST
                );
                numberOfPicsResponse = await backendFetch(
                    token,
                    setInfo,
                    apiEndpointURLNumber,
                    METHOD,
                    ERROR_MESSAGE_NUMBER
                );
                setPictures([...pictureListResponse.images]);
                setNumberOfPictures(numberOfPicsResponse?.count);
                setLoading(false);
                onFetchComplete('pictureList');
            } catch (error) {
                setLoading(false);
                onFetchComplete('pictureList');
            }

            shouldInitialize.current = false;
        }
    };

    /**
     * Handles the click event on an image, opening it in the lightbox.
     *
     * @function
     * @param {ImageType} image - The selected image.
     * @returns {void}
     */
    const handleImageClick = (image: ImageType): void =>
        setSelectedImage(image);

    useEffect(() => {
        if (shouldInitialize.current === true) handleFetchUserPics();
    }, [userId]);

    /**
     * JSX Element representing a list of individual picture.
     *
     * @type {JSX.Element[]}
     */
    const pictureList: JSX.Element[] = pictures?.map((picture) => (
        <div
            key={picture.id}
            className="relative flex rounded outline-highlight dark:outline-highlightDark hover:outline"
        >
            <img
                className="h-auto aspect-square object-cover  rounded"
                src={`data:image/png;base64,${picture?.data}`}
                alt="User uploaded image"
            />
            <div
                onClick={() => handleImageClick(picture)}
                className="absolute inset-0 flex justify-center items-center aspect-square bg-black bg-opacity-75 opacity-0 hover:opacity-80 transition-opacity cursor-pointer rounded"
            >
                <span className="text-white text-lg font-bold">
                    <MdZoomOutMap size="1.5em" />
                </span>
            </div>
        </div>
    ));

    /**
     * JSX Element representing the loading content.
     *
     * @type {JSX.Element}
     */
    const LoadingContent: JSX.Element = (
        <div className="flex justify-center items-center w-full py-4">
            <LoadingSpinner />
        </div>
    );

    /**
     * JSX Element representing the content of the PictureList component.
     *
     * @type {JSX.Element[] | JSX.Element}
     */
    const PictureListContent: JSX.Element[] | JSX.Element =
        pictureList.length > 0 ? (
            pictureList
        ) : (
            <span className="col-span-3 text-sm font-medium">
                Nothing here yet
            </span>
        );

    /**
     * JSX Element representing the "See All Pictures" button.
     *
     * @type {JSX.Element}
     */
    const SeeAllPicturesButton: JSX.Element = (
        <motion.button whileTap={{ scale: 0.97 }}>
            <Link
                to={`/users/${userId}/gallery`}
                className="flex items-center justify-center md:justify-start gap-2 w-full md:w-fit bg-button dark:bg-buttonDark hover:bg-buttonHover dark:hover:bg-buttonDarkHover text-regularTextDark rounded px-2 py-1 mt-4 text-sm"
            >
                See all <MdKeyboardDoubleArrowRight size="1.25em" />
            </Link>
        </motion.button>
    );

    /**
     * JSX Element representing the complete PictureList component.
     *
     * @type {JSX.Element}
     */
    return (
        <div className="px-4 md:px-0">
            <h1 className="text-base font-bold">Pictures</h1>

            {loading ? (
                LoadingContent
            ) : (
                <div className="animate-inAnimation grid grid-cols-3 gap-4">
                    {PictureListContent}
                </div>
            )}

            {numberOfPictures > MAX_NUMBER_OF_PICTURES_TO_SHOW &&
                SeeAllPicturesButton}
            <AnimatePresence>
                {selectedImage && (
                    <LightBox
                        image={selectedImage}
                        onClose={() => setSelectedImage(null)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
