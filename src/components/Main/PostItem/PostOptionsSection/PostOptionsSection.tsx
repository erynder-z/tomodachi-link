import React, { useState } from 'react';
import { MdEdit, MdOutlineDeleteForever } from 'react-icons/md';
import { FaRegSmile, FaExclamationTriangle } from 'react-icons/fa';
import { handleFetchErrors } from '../../../../utilities/handleFetchErrors';
import useAuth from '../../../../hooks/useAuth';
import useInfoCard from '../../../../hooks/useInfoCard';
import ConfirmationOverlay from '../../../ConfirmationOverlay/ConfirmationOverlay';
import { TbQuestionCircle } from 'react-icons/tb';
import EditPostInput from '../../EditPostInput/EditPostInput';
import { PostType } from '../../../../types/postType';
import ToggleListButton from '../../UiElements/ToggleListButton/ToggleListButton';

type PostOptionsSectionProps = {
    handleShowPostMenu: () => void;
    isMenuOpen: boolean;
    setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
    postDetails: PostType | null;
    onPostChange: () => void;
};

export default function PostOptionsSection({
    handleShowPostMenu,
    isMenuOpen,
    setIsMenuOpen,
    postDetails,
    onPostChange,
}: PostOptionsSectionProps) {
    const { token } = useAuth();
    const { setInfo } = useInfoCard();
    const [showPostEdit, setShowPostEdit] = useState(false);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);

    const handleDelete = async () => {
        try {
            const serverURL = import.meta.env.VITE_SERVER_URL;
            const postID = postDetails?._id;

            const response = await fetch(
                `${serverURL}/api/v1/post/${postID}/delete`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ postID }),
                }
            );

            if (!response.ok) {
                handleFetchErrors(response, setInfo);
            }

            setInfo({
                typeOfInfo: 'good',
                message: 'Post deleted!',
                icon: <FaRegSmile />,
            });
            onPostChange();
        } catch (err: unknown) {
            setInfo({
                typeOfInfo: 'bad',
                message: 'Unable to delete post!',
                icon: <FaExclamationTriangle />,
            });
        }
    };

    const handleEditButtonClick = () => {
        setShowPostEdit(true);
        setIsMenuOpen(false);
    };

    const handleDeleteButtonClick = () => {
        setShowConfirmDialog(true);
        setIsMenuOpen(false);
    };

    return (
        <>
            {showConfirmDialog && (
                <ConfirmationOverlay
                    setShowConfirmDialog={setShowConfirmDialog}
                    onConfirm={() => {
                        handleDelete();
                    }}
                    dialogInfo={{
                        message: 'Do you really want to delete this post?',
                        icon: <TbQuestionCircle size="2em" />,
                    }}
                />
            )}
            <div className="relative inline-block">
                <ToggleListButton
                    onToggleListButtonClick={handleShowPostMenu}
                    isMenuOpen={isMenuOpen}
                />

                {isMenuOpen && (
                    <div className="absolute top-8 right-0 z-10 bg-popupMenu border shadow-lg">
                        <ul className="flex flex-col gap-4 ">
                            <li>
                                <button
                                    onClick={handleEditButtonClick}
                                    className="flex justify-around items-center gap-2 w-full p-4 hover:bg-red-300"
                                >
                                    <MdEdit size="1.25em" />
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={handleDeleteButtonClick}
                                    className="flex justify-center items-center gap-2 w-full p-4 hover:bg-red-300"
                                >
                                    <MdOutlineDeleteForever size="1.25em" />
                                </button>
                            </li>
                        </ul>
                    </div>
                )}
                {showPostEdit && (
                    <EditPostInput
                        postDetails={postDetails}
                        setShowPostEdit={setShowPostEdit}
                        onPostChange={onPostChange}
                    />
                )}
            </div>
        </>
    );
}
