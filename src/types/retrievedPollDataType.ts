import { CommentType } from './commentType';
import { MinimalUserTypes } from './minimalUserTypes';

export type RetrievedPollDataType = {
    _id: string;
    owner: MinimalUserTypes;
    timestamp: Date;
    question: string;
    numberOfOptions: number;
    options: { nameOfOption: string; selectionCount: number }[];
    description?: string;
    isFriendOnly: boolean;
    allowComments: boolean;
    comments?: CommentType[];
};
