import { useLocation } from 'react-router-dom';
import { FriendDataType } from '../../../../../types/friendTypes';
import AllFiendsPageItem from './AllFriendsPageItem/AllFriendsPageItem';

type AllFriendsPageProps = {
    isPaginationTriggered: boolean;
};

export default function AllFriendsPage({
    isPaginationTriggered,
}: AllFriendsPageProps) {
    const location = useLocation();
    const friendData = location.state?.friendData; // receive FriendData from Router-Link in "FriendList" component.
    // type: friendData: FriendDataType[] | null;

    const completeFriendList = friendData?.map((friend: FriendDataType) => (
        <AllFiendsPageItem key={friend._id} friendData={friend} />
    ));

    return (
        <div className="flex flex-col justify-center items-center w-full p-4 bg-card dark:bg-cardDark text-regularText dark:text-regularTextDark rounded lg:rounded-lg">
            <h1 className="font-bold mb-4">All friends</h1>
            <div className="flex flex-col md:grid grid-cols-4 gap-4">
                {completeFriendList}
            </div>
        </div>
    );
}
