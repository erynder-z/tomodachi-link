import { CommentType } from './commentType';
import { MinimalUserTypes } from './minimalUserTypes';

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
