import { useLocation } from 'react-router-dom';
import { FriendDataType } from '../../../../../types/friendTypes';
import AllFiendsPageItem from './AllFriendsPageItem/AllFriendsPageItem';

/**
 * React component for rendering the All Friends page.
 *
 * @component
 * @returns {JSX.Element} The rendered AllFriendsPage component.
 */
export default function AllFriendsPage(): JSX.Element {
    const location = useLocation();
    const friendData = location.state?.friendData; // receive FriendData from Router-Link in "FriendList" component.
    // type: friendData: FriendDataType[] | null;

    /**
     * Generates JSX elements for each friend in the friend list.
     *
     * @type {JSX.Element[] | null}
     */
    const completeFriendList: JSX.Element[] | null = friendData?.map(
        (friend: FriendDataType) => (
            <AllFiendsPageItem key={friend._id} friendData={friend} />
        )
    );

    /**
     * JSX Element representing the All Friends page.
     *
     * @type {JSX.Element}
     */
    return (
        <div className="flex flex-col justify-center items-center w-full p-4 bg-card dark:bg-cardDark text-regularText dark:text-regularTextDark rounded lg:rounded-lg">
            <h1 className="font-bold mb-4">All friends</h1>
            <div className="flex flex-col md:grid grid-cols-4 gap-4">
                {completeFriendList}
            </div>
        </div>
    );
}
