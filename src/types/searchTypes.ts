import { MinimalUserTypes } from './otherUserTypes';

export type SearchResultUserType = MinimalUserTypes;

export type SearchResultPostType = {
    _id: string;
    text: string;
    updatedAt: Date;
};

export type SearchResultPollType = {
    _id: string;
    question: string;
    description?: string;
    updatedAt: Date;
};

export type SearchResultType = {
    type: 'user' | 'post' | 'poll';
    data: SearchResultUserType | SearchResultPostType | SearchResultPollType;
};

export type SearchModeType = 'all' | 'users' | 'posts' | 'polls';
