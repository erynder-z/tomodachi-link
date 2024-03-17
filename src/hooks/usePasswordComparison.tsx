import { useEffect, useState } from 'react';
import { PasswordForm } from '../types/miscTypes';

type PasswordComparisonResult = {
    passwords: PasswordForm;
    isMatchingPassword: boolean;
    handlePasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleConfirmPasswordChange: (
        event: React.ChangeEvent<HTMLInputElement>
    ) => void;
};

/**
 * Custom hook for comparing passwords and handling password changes.
 *
 * @param {PasswordForm} initialState - the initial state for the password form
 * @return {Object} an object containing passwords, isMatchingPassword, handlePasswordChange, and handleConfirmPasswordChange
 */
export function usePasswordComparison(
    initialState: PasswordForm
): PasswordComparisonResult {
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
