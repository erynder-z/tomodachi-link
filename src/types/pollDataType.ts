export type PollDataType = {
    question: string;
    numberOfOptions: number;
    options: string[];
    description: string;
    isFriendOnly: boolean;
    allowComments: boolean;
};
