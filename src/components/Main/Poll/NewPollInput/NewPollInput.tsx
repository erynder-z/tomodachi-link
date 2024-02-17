import { useState } from 'react';
import useAuth from '../../../../hooks/useAuth';
import useInfoCard from '../../../../hooks/useInfoCard';
import PollQuestionInput from './PollQuestionInput/PollQuestionInput';
import PollOptionsNumberDropdown from './PollOptionsNumberDropdown/PollOptionsNumberDropdown';
import PollOptionsInput from './PollOptionsInput/PollOptionsInput';
import PollDescriptionTextArea from './PollDescriptionTextArea/PollDescriptionTextArea';
import CreatePollButton from './CreatePollButton/CreatePollButton';
import { CreatedPollDataType } from '../../../../types/pollTypes';
import FriendsOnlyCheckbox from './PollRestrictions/FriendsOnlyCheckbox/FriendsOnlyCheckbox';
import CommentsCheckbox from './PollRestrictions/CommentsCheckbox/CommentsCheckbox';
import { useNavigate } from 'react-router-dom';
import { displaySuccessInfo } from '../../../UiElements/UserNotification/displaySuccessInfo';
import { displayErrorInfo } from '../../../UiElements/UserNotification/displayErrorInfo';

/**
 * NewPollInput component for creating a new poll.
 *
 * @component
 * @return {JSX.Element} The rendered NewPollInput component.
 */
export default function NewPollInput(): JSX.Element {
    const { token } = useAuth();
    const { setInfo } = useInfoCard();
    const navigate = useNavigate();

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [pollData, setPollData] = useState<CreatedPollDataType>({
        question: '',
        numberOfOptions: 2,
        options: ['', ''],
        description: '',
        isFriendOnly: false,
        allowComments: false,
    });

    /**
     * Handles the change in the poll question input.
     *
     * @param {React.ChangeEvent<HTMLInputElement>} event - The input change event.
     * @return {void} No return value.
     */
    const handleQuestionInputChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        const question = event.target.value;
        setPollData((prevData: CreatedPollDataType) => ({
            ...prevData,
            question: question,
        }));
    };

    /**
     * Handles the selection of the number of options in the poll.
     *
     * @param {number} selectedNumber - The selected number of options.
     * @return {void} No return value.
     */
    const handleOptionsNumberSelect = (selectedNumber: number): void => {
        const arrayWithGivenNumberOfEmptyStrings = Array.from(
            { length: selectedNumber },
            () => ''
        );
        setPollData((prevData: CreatedPollDataType) => ({
            ...prevData,
            numberOfOptions: selectedNumber,
            options: arrayWithGivenNumberOfEmptyStrings,
        }));
    };

    /**
     * Handles the change in poll option input.
     *
     * @param {number} index - The index of the poll option.
     * @param {string} value - The value of the poll option.
     * @return {void} No return value.
     */
    const handlePollOptionInputChange = (
        index: number,
        value: string
    ): void => {
        const updatedOptions = [...pollData.options];
        updatedOptions[index] = value;
        setPollData((prevData: CreatedPollDataType) => ({
            ...prevData,
            options: updatedOptions,
        }));
    };

    /**
     * Handles the form submission.
     *
     * @async
     * @function
     * @param {React.FormEvent<HTMLFormElement>} event - The form submission event.
     * @return {Promise<void>} A promise that resolves once the submission is complete.
     */
    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        event.preventDefault();

        if (token) {
            setIsSubmitting(true);

            try {
                const SERVER_URL = import.meta.env.VITE_SERVER_URL;
                const response = await fetch(`${SERVER_URL}/api/v1/poll`, {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(pollData),
                });

                if (response.ok) {
                    displaySuccessInfo(
                        setInfo,
                        'Poll created successfully!',
                        '👍'
                    );
                    setPollData({
                        question: '',
                        numberOfOptions: 1,
                        options: [''],
                        description: '',
                        isFriendOnly: false,
                        allowComments: false,
                    });
                } else {
                    const data = await response.json();
                    const errorMessages = data.errors;
                    const message = errorMessages
                        .map((error: { msg: string }) => error.msg)
                        .join(', ');

                    displayErrorInfo(setInfo, message, '👻');

                    throw new Error(
                        `Error: ${response.status} ${response.statusText}`
                    );
                }
            } catch (error) {
                displayErrorInfo(setInfo, "An error occurred'", '👻');
            }

            setIsSubmitting(false);
            navigate('/polls/list');
        }
    };

    /**
     * JSX element for the form content.
     *
     * @type {JSX.Element}
     */
    const FormContent: JSX.Element = (
        <form
            action=""
            method="POST"
            onSubmit={handleSubmit}
            className="flex flex-col w-full divide-gray-200"
        >
            <div className="flex flex-col gap-4 relative w-full text-base leading-6 space-y-4 text-gray-700 dark:text-gray-300 sm:text-lg sm:leading-7">
                <PollQuestionInput
                    pollData={pollData}
                    handleQuestionInputChange={handleQuestionInputChange}
                />
                <PollOptionsNumberDropdown
                    handleOptionsNumberSelect={handleOptionsNumberSelect}
                />
                <PollOptionsInput
                    pollData={pollData}
                    handlePollOptionInputChange={handlePollOptionInputChange}
                />
                <PollDescriptionTextArea
                    pollData={pollData}
                    setPollData={setPollData}
                />
                <FriendsOnlyCheckbox
                    pollData={pollData}
                    setPollData={setPollData}
                />
                <CommentsCheckbox
                    pollData={pollData}
                    setPollData={setPollData}
                />
            </div>
            <CreatePollButton pollData={pollData} isSubmitting={isSubmitting} />
        </form>
    );

    /**
     * The rendered NewPollInput component.
     *
     * @returns {JSX.Element}
     */
    return (
        <div className="font-roboto flex gap-4 p-2 md:p-4 w-11/12 lg:w-full lg:flex-row lg:justify-around rounded lg:shadow-lg bg-card dark:bg-cardDark">
            {FormContent}
        </div>
    );
}
