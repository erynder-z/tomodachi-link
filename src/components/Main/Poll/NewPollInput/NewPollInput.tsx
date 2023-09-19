import React, { useState } from 'react';
import useCurrentUserData from '../../../../hooks/useCurrentUserData';
import useAuth from '../../../../hooks/useAuth';
import useInfoCard from '../../../../hooks/useInfoCard';
import PollQuestionInput from './PollQuestionInput/PollQuestionInput';
import PollOptionsNumberDropdown from './PollOptionsNumberDropdown/PollOptionsNumberDropdown';

export default function NewPollInput() {
    const { token } = useAuth();
    const { setInfo } = useInfoCard();
    const { currentUserData } = useCurrentUserData();

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [pollTitle, setPollTitle] = useState<string>('');
    const [numberOfPollOptions, setNumberOfPollOptions] = useState<number>(1);
    const [pollOptions, setPollOptions] = useState<string[]>(['']);

    const handleQuestionChange = (event: React.ChangeEvent<HTMLInputElement>) =>
        setPollTitle(event.target.value);

    const handleOptionsNumberChange = (selectedNumber: number) => {
        setNumberOfPollOptions(selectedNumber);

        setPollOptions(Array.from({ length: selectedNumber }, () => ''));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (token) {
            setIsSubmitting(true);

            try {
                console.log('submit');
            } catch (error) {
                setInfo({
                    typeOfInfo: 'bad',
                    message: 'An error occurred',
                    icon: '👻',
                });
            }

            setIsSubmitting(false);
        }
    };

    const FormContent = (
        <form
            action=""
            method="POST"
            onSubmit={handleSubmit}
            className="flex w-full divide-gray-200"
        >
            <div className="flex flex-col gap-4 relative w-full text-base leading-6 space-y-4 text-gray-700 dark:text-gray-300 sm:text-lg sm:leading-7">
                <PollQuestionInput
                    pollTitle={pollTitle}
                    handleQuestionChange={handleQuestionChange}
                />
                <PollOptionsNumberDropdown
                    handleOptionsNumberChange={handleOptionsNumberChange}
                />
            </div>
        </form>
    );

    return (
        <div className="font-roboto flex gap-4 p-2 md:p-4 lg:w-full lg:flex-row lg:justify-around rounded lg:shadow-lg bg-card dark:bg-cardDark">
            {FormContent}
        </div>
    );
}
