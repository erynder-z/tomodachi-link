import React, { useEffect, useState } from 'react';
import { MinimalPostType } from '../../../../types/minimalPostType';
import { fetchMinimalUserData } from '../../../../utilities/fetchMinimalUserData';
import useAuth from '../../../../hooks/useAuth';
import useInfoCard from '../../../../hooks/useInfoCard';
import { MinimalUserTypes } from '../../../../types/minimalUserTypes';
import UserListItem from '../../UserList/UserListItem/UserListItem';

type ShowPeopleInThisFeedProps = {
    friendList: string[];
    minimalPosts: MinimalPostType[];
};

export default function ShowPeopleInThisFeed({
    friendList,
    minimalPosts,
}: ShowPeopleInThisFeedProps) {
    const { token } = useAuth();
    const { setInfo } = useInfoCard();
    const [IdsOfPeopleInFeed, setIdsOfPeopleInFeed] = useState<string[]>([]);
    const [feedUsers, setFeedUsers] = useState<MinimalUserTypes[]>([]);

    const getIdsOfPeopleInFeed = () => {
        const newPeopleInFeed: Set<string> = new Set();
        minimalPosts.forEach((post) => {
            if (friendList.includes(post?.owner?._id)) {
                newPeopleInFeed.add(post?.owner?._id);
            } else {
                if (newPeopleInFeed.has(post?.owner?._id)) {
                    newPeopleInFeed.delete(post?.owner?._id);
                }
            }
        });
        setIdsOfPeopleInFeed(Array.from(newPeopleInFeed));
    };

    const handleGetUserDetails = async () => {
        if (token) {
            const requests = Array.from(new Set(IdsOfPeopleInFeed)).map((p) =>
                fetchMinimalUserData(token, p, setInfo)
            );
            const responses = await Promise.all(requests);
            setFeedUsers((prevUsers) => {
                const existingUserIds = prevUsers.map((user) => user._id);
                const newUsers = responses.filter(
                    (user) => !existingUserIds.includes(user._id)
                );
                return [...prevUsers, ...newUsers];
            });
        }
    };

    useEffect(() => {
        getIdsOfPeopleInFeed();
    }, [minimalPosts]);

    useEffect(() => {
        handleGetUserDetails();
    }, [IdsOfPeopleInFeed]);

    const feedUserList = feedUsers?.map((feedUser: MinimalUserTypes) => (
        <div className="animate-popInAnimation">
            <UserListItem key={feedUser._id} listItemData={feedUser} />
        </div>
    ));

    return <div className="sticky top-10 h-fit">{feedUserList}</div>;
}
