export type MinimalUserTypes = {
    _id: string;
    firstName: string;
    lastName: string;
    username: string;
    userpic: {
        data: { data: Buffer };
        contentType: string;
    };
};
