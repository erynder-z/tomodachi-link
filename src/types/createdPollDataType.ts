export type CreatedPollDataType = {
    question: string;
    numberOfOptions: number;
    options: string[];
    description: string;
    isFriendOnly: boolean;
    allowComments: boolean;
};
