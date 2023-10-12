import { useState } from 'react';
import { ImageType } from '../../../../types/miscTypes';
import PostItem from '../PostItem/PostItem';
import { motion, AnimatePresence } from 'framer-motion';
import LightBox from '../../../UiElements/LightBox/LightBox';
import { useNavigate, useParams } from 'react-router-dom';
import { MdOutlineArrowBack } from 'react-icons/md';

export default function SinglePostPage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [clickedImage, setClickedImage] = useState<ImageType | null>(null);
    const [clickedGif, setClickedGif] = useState<string | null>(null);
    const [postKeyModifier, setPostKeyModifier] = useState<number>(0);

    const showImageLightbox = !!clickedImage;
    const showGifLightbox = !!clickedGif;

    const postID = id || '';

    const refreshPost = async () => {
        setPostKeyModifier(postKeyModifier + 1);
    };

    return (
        <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-4 p-4 min-h-[calc(100vh_-_2rem)] w-full bg-background2 dark:bg-background2Dark rounded text-regularText dark:text-regularTextDark"
        >
            <MdOutlineArrowBack
                onClick={() => navigate(-1)}
                size="1.5em"
                className="cursor-pointer hover:text-highlight dark:hover:text-highlightDark hover:animate-squish duration-300"
            />
            <h1 className="text-center text-xl font-bold mb-4">
                Search result
            </h1>
            <div className="md:w-[62.8%] mx-auto">
                <PostItem
                    key={postID + postKeyModifier}
                    postID={postID}
                    setClickedImage={setClickedImage}
                    setClickedGif={setClickedGif}
                    onPostChange={refreshPost}
                />
            </div>
            <AnimatePresence>
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
            </AnimatePresence>
        </motion.div>
    );
}
