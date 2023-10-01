import { CommentType } from './commentTypes';
import { MinimalUserTypes } from './otherUserTypes';

export type CreatedPollDataType = {
    question: string;
    numberOfOptions: number;
    options: string[];
    description: string;
    isFriendOnly: boolean;
    allowComments: boolean;
};

export type PollDataItemType = {
    nameOfOption: string;
    selectionCount: number;
};

export type RetrievedPollDataType = {
    _id: string;
    owner: MinimalUserTypes;
    question: string;
    numberOfOptions: number;
    options: { _id: string; nameOfOption: string; selectionCount: number }[];
    description?: string;
    isFriendOnly: boolean;
    allowComments: boolean;
    comments?: CommentType[];
    createdAt: Date;
    updatedAt: Date;
};
