import { useEffect, useState } from 'react';

type PasswordForm = {
    password: string;
    confirmPassword: string;
};

export function usePasswordComparison(initialState: PasswordForm) {
    const [passwords, setPasswords] = useState<PasswordForm>(initialState);
    const [isMatchingPassword, setIsMatchingPassword] =
        useState<boolean>(false);

    const handlePasswordChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setPasswords({ ...passwords, password: event.target.value });
    };

    const handleConfirmPasswordChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setPasswords({ ...passwords, confirmPassword: event.target.value });
    };

    useEffect(() => {
        if (passwords.password === passwords.confirmPassword) {
            setIsMatchingPassword(true);
        } else {
            setIsMatchingPassword(false);
        }
    }, [passwords]);

    return {
        passwords,
        isMatchingPassword,
        handlePasswordChange,
        handleConfirmPasswordChange,
    };
}
