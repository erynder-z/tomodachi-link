import { useEffect, useMemo, useRef, useState } from 'react';
import UserListItem from '../UserListItem/UserListItem';
import LoadingSpinner from '../../../UiElements/LoadingSpinner/LoadingSpinner';
import useAuth from '../../../../hooks/useAuth';
import useInfoCard from '../../../../hooks/useInfoCard';
import { MinimalUserTypes } from '../../../../types/otherUserTypes';
import { AnimatePresence, motion } from 'framer-motion';
import { backendFetch } from '../../../../utilities/backendFetch';
import { PaginatedListDataType } from '../../../../types/miscTypes';

export default function UserListAll() {
    const { token, authUser } = useAuth();
    const { setInfo } = useInfoCard();
    const [numberOfUsers, setNumberOfUsers] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(true);
    const [paginatedData, setPaginatedData] = useState<PaginatedListDataType[]>(
        []
    );

    const shouldInitialize = useRef(true);

    const ITEMS_PER_PAGE = 12;

    const totalPages = Math.ceil((numberOfUsers ?? 0) / ITEMS_PER_PAGE);
    const isOnFirstPage = currentPage === 1;
    const isOnLastPage = currentPage === totalPages;
    const isFullLengthPage =
        paginatedData.find((data) => data.page === currentPage)?.pageUserData
            ?.length === ITEMS_PER_PAGE;

    const handleFetchAllUsers = async () => {
        if (authUser && token) {
            setLoading(true);
            const apiEndpointURL = `/api/v1/users/all?skip=${
                (currentPage - 1) * 12
            }`;
            const METHOD = 'GET';
            const ERROR_MESSAGE = 'Unable to fetch users!';

            // Check if the page data already exists in the array
            const isPageDataExist = paginatedData.some(
                (data) => data.page === currentPage
            );

            if (!isPageDataExist) {
                // If the page data doesn't exist, fetch it
                const fetchedUsers = await backendFetch(
                    token,
                    setInfo,
                    apiEndpointURL,
                    METHOD,
                    ERROR_MESSAGE
                );

                // Add page data only if it doesn't exist
                setPaginatedData((prevData) => [
                    ...prevData,
                    { page: currentPage, pageUserData: fetchedUsers?.userList },
                ]);
            }

            setLoading(false);
        }
    };

    const handleFetchNumberOfUsers = async () => {
        if (authUser && token) {
            const API_ENDPOINT_URL = '/api/v1/users/count';
            const METHOD = 'GET';
            const ERROR_MESSAGE = 'Unable to fetch users!';

            const fetchedNumberOfUsers = await backendFetch(
                token,
                setInfo,
                API_ENDPOINT_URL,
                METHOD,
                ERROR_MESSAGE
            );
            setNumberOfUsers(fetchedNumberOfUsers?.numberOfUsers);
        }
    };

    const handlePreviousPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    useEffect(() => {
        if (currentPage === 1) return;
        handleFetchAllUsers();
    }, [currentPage]);

    const userList = useMemo(() => {
        // Find the user data for the current page
        const pageData = paginatedData.find(
            (data) => data.page === currentPage
        );
        return pageData?.pageUserData.map((user: MinimalUserTypes) => (
            <UserListItem key={user._id} listItemData={user} />
        ));
    }, [paginatedData, currentPage]);

    useEffect(() => {
        if (shouldInitialize.current) {
            handleFetchNumberOfUsers();
            handleFetchAllUsers();
        }

        return () => {
            shouldInitialize.current = false;
        };
    }, []);

    const LoadingContent = (
        <div className="flex justify-center items-center w-full h-[calc(100vh_-_3rem)] py-4 ">
            <LoadingSpinner />
        </div>
    );

    const UserListContent = (
        <motion.div
            key="userList"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col h-[calc(100vh_-_5rem)] md:h-full w-full p-4 bg-card dark:bg-cardDark text-regularText dark:text-regularTextDark rounded lg:rounded-lg"
        >
            <h1 className="text-center font-bold mb-4">All users:</h1>

            <motion.div
                key={currentPage}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className={`flex flex-col h-full w-full gap-2 overflow-y-auto ${
                    isFullLengthPage ? 'justify-between' : 'justify-start'
                }`}
            >
                {userList}
            </motion.div>

            {totalPages > 1 && (
                <div className="flex justify-center mt-4">
                    <motion.button
                        onClick={handlePreviousPage}
                        whileTap={{ scale: 0.97 }}
                        disabled={isOnFirstPage}
                        className={`w-1/2 flex items-center justify-center p-2 text-regularTextDark rounded text-sm text-center mr-2 ${
                            isOnFirstPage
                                ? 'bg-gray-500 hover:bg-gray-600 cursor-default'
                                : 'bg-button dark:bg-buttonDark hover:bg-buttonHover dark:hover:bg-buttonDarkHover'
                        }`}
                    >
                        Previous
                    </motion.button>
                    <motion.button
                        onClick={handleNextPage}
                        whileTap={{ scale: 0.97 }}
                        disabled={isOnLastPage || loading || !numberOfUsers}
                        className={`w-1/2 flex items-center justify-center p-2 text-regularTextDark rounded text-sm text-center ${
                            isOnLastPage || loading
                                ? 'bg-gray-500 hover:bg-gray-600 cursor-default'
                                : 'bg-button dark:bg-buttonDark hover:bg-buttonHover dark:hover:bg-buttonDarkHover'
                        }`}
                    >
                        Next
                    </motion.button>
                </div>
            )}
        </motion.div>
    );

    return (
        <AnimatePresence>
            {loading ? LoadingContent : UserListContent}
        </AnimatePresence>
    );
}
