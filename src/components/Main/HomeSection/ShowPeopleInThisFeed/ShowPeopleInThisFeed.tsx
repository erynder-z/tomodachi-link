import React, { useEffect, useState } from 'react';
import { MinimalPostType } from '../../../../types/minimalPostType';
import { fetchMinimalUserData } from '../../../../utilities/fetchMinimalUserData';
import useAuth from '../../../../hooks/useAuth';
import useInfoCard from '../../../../hooks/useInfoCard';
import { MinimalUserTypes } from '../../../../types/minimalUserTypes';

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
    const [peopleInFeed, setPeopleInFeed] = useState<string[]>([]);
    const [users, setUsers] = useState<MinimalUserTypes[]>([]);

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
        setPeopleInFeed(Array.from(newPeopleInFeed));
    };

    const handleGetUserDetails = async () => {
        if (token) {
            const requests = Array.from(new Set(peopleInFeed)).map((p) =>
                fetchMinimalUserData(token, p, setInfo)
            );
            const responses = await Promise.all(requests);
            setUsers((prevUsers) => {
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
    }, [peopleInFeed]);

    return <div>ShowPeopleInThisFeed</div>;
}
