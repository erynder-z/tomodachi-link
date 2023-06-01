import { CoverType } from './coverType';
import { ImageType } from './imageType';

export type CurrentUserDataType = {
    _id: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    friends: string[];
    posts: string[];
    bookmarks: string[];
    pendingFriendRequests: string[];
    joined: Date;
    lastSeen: Date;
    userpic: ImageType;
    cover: CoverType;
};
