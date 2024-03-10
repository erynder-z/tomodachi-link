import { useEffect, useMemo, useRef, useState } from 'react';
import UserListItem from '../UserListItem/UserListItem';
import LoadingSpinner from '../../../UiElements/LoadingSpinner/LoadingSpinner';
import useAuth from '../../../../hooks/useAuth';
import useInfoCard from '../../../../hooks/useInfoCard';
import { MinimalUserTypes } from '../../../../types/otherUserTypes';
import { AnimatePresence, motion } from 'framer-motion';
import { backendFetch } from '../../../../utilities/backendFetch';
import { PaginatedListDataType } from '../../../../types/miscTypes';
import { SearchModeType } from '../../../../types/searchTypes';
import { MdPersonSearch } from 'react-icons/md';
import { Tooltip } from 'react-tooltip';

type UserListAllProps = {
    setShouldOverlaysShow: React.Dispatch<
        React.SetStateAction<{
            searchOverlay: boolean;
            editUserDataModal: boolean;
            mobileOptionsModal: boolean;
            guestAccountOverlay: boolean;
        }>
    >;
    setSearchMode: React.Dispatch<React.SetStateAction<SearchModeType>>;
};

/**
 * Represents a component for rendering a list of all users.
 *
 * @component
 * @param {UserListAllProps} props - The component props.
 * @param {React.Dispatch} props.setShouldOverlaysShow - Function to set overlay visibility.
 * @param {React.Dispatch} props.setSearchMode - Function to set the search mode.
 * @returns {JSX.Element} The rendered UserListAll component.
 */
export default function UserListAll({
    setShouldOverlaysShow,
    setSearchMode,
}: UserListAllProps): JSX.Element {
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

    /**
     * Handles fetching all users based on the current page.
     *
     * @async
     * @function
     * @returns {Promise<void>} A promise that resolves when the data is fetched.
     */
    const handleFetchAllUsers = async (): Promise<void> => {
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

    /**
     * Handles fetching the total number of users in the database.
     *
     * @async
     * @function
     * @returns {Promise<void>} A promise that resolves when the data is fetched.
     */
    const handleFetchNumberOfUsers = async (): Promise<void> => {
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

    /**
     * Updates the current page to the previous page, ensuring it doesn't go below 1.
     *
     * @function
     * @returns {void}
     */
    const handlePreviousPage = (): void => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    /**
     * Function to handle the next page.
     * @function
     * @returns {void}
     */
    const handleNextPage = (): void => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    /**
     * Function to handle the search button click.
     *
     * @function
     * @returns {void}
     */
    const handleSearchButtonClick = (): void => {
        setSearchMode('users');
        setShouldOverlaysShow({
            searchOverlay: true,
            editUserDataModal: false,
            mobileOptionsModal: false,
            guestAccountOverlay: false,
        });
    };

    /**
     * Effect hook that runs when the currentPage changes.
     * Fetches all users based on the current page.
     *
     * @effect
     * @returns {void}
     */
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

    /**
     * Effect hook that runs when the component mounts.
     * Fetches the total number of users and all users for the initial render.
     *
     * @effect
     * @returns {void}
     */
    useEffect(() => {
        if (shouldInitialize.current) {
            handleFetchNumberOfUsers();
            handleFetchAllUsers();
        }

        return () => {
            shouldInitialize.current = false;
        };
    }, []);

    /**
     * JSX Element representing the loading content.
     * @type {JSX.Element}
     */
    const LoadingContent: JSX.Element = (
        <div className="flex justify-center items-center w-full h-full py-4">
            <LoadingSpinner />
        </div>
    );

    /**
     * Feed content to be displayed when the user list is loaded.
     *
     * @constant
     * @type {JSX.Element}
     */
    const UserListContent: JSX.Element = (
        <motion.div
            key="userList"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col h-[calc(100vh_-_5rem)] md:h-full min-h-[calc(100vh_-_5rem)] md:min-h-full w-full p-4 bg-card dark:bg-cardDark text-regularText dark:text-regularTextDark rounded lg:rounded-lg"
        >
            <div className="flex justify-between items-center gap-2 mb-4">
                <h1 className="text-lg m-0 text-center font-bold">
                    All users:
                </h1>
                <button
                    data-tooltip-id="user-search-button-tooltip"
                    data-tooltip-content="Search for user"
                    data-tooltip-variant="dark"
                    data-tooltip-delay-show={500}
                    onClick={handleSearchButtonClick}
                    className="h-full bg-button dark:bg-buttonDark hover:bg-buttonHover dark:hover:bg-buttonDarkHover text-regularTextDark dark:text-regularTextDark rounded px-4 transition-all"
                >
                    <MdPersonSearch onClick={handleSearchButtonClick} />
                </button>
                <Tooltip
                    id="user-search-button-tooltip"
                    style={{ fontSize: '0.75rem' }}
                />
            </div>

            <motion.div
                key={currentPage}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className={`flex flex-col h-full w-full overflow-y-auto ${
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
                        className={`w-1/2 flex items-center justify-center p-2 text-regularTextDark rounded text-sm text-center transition-all ${
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

    /**
     * The user list capable of displaying all users.
     *
     * @returns {JSX.Element}
     */
    return (
        <AnimatePresence mode="wait">
            {loading ? LoadingContent : UserListContent}
        </AnimatePresence>
    );
}
