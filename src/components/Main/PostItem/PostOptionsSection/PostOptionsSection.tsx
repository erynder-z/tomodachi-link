import React from 'react';
import { MdMoreVert, MdEdit, MdOutlineDeleteForever } from 'react-icons/md';
import { FaRegSmile, FaExclamationTriangle } from 'react-icons/fa';
import { handleFetchErrors } from '../../../../utilities/handleFetchErrors';
import useAuth from '../../../../hooks/useAuth';
import useInfoCard from '../../../../hooks/useInfoCard';
import useCurrentUserData from '../../../../hooks/useCurrentUserData';

type PostOptionsSectionProps = {
    handleShowPostMenu: () => void;
    isMenuOpen: boolean;
    postID: string | undefined;
    onPostChange: () => void;
};

export default function PostOptionsSection({
    handleShowPostMenu,
    isMenuOpen,
    postID,
    onPostChange,
}: PostOptionsSectionProps) {
    const { token } = useAuth();
    const { handleFetchUserData } = useCurrentUserData();
    const { setInfo } = useInfoCard();

    const handleDeleteClick = async () => {
        try {
            const serverURL = import.meta.env.VITE_SERVER_URL;

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

    return (
        <div className="relative inline-block">
            <button onClick={handleShowPostMenu}>
                <MdMoreVert size="1.25em" />
            </button>
            {isMenuOpen && (
                <div className="absolute top-8 right-0 z-10 bg-popupMenu border shadow-lg">
                    <ul className="flex flex-col gap-4 ">
                        <li>
                            <button className="flex justify-around items-center gap-2 w-full p-4 hover:bg-red-300">
                                <MdEdit size="1.25em" />
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={handleDeleteClick}
                                className="flex justify-center items-center gap-2 w-full p-4 hover:bg-red-300"
                            >
                                <MdOutlineDeleteForever size="1.25em" />
                            </button>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
}
