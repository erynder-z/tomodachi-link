import React from 'react';
import ButtonBusy from '../../../../UiElements/LoadingSpinner/ButtonBusy';
import { MdOutlineStart } from 'react-icons/md';

type CreatePollButtonProps = {
    pollQuestion: string;
    isSubmitting: boolean;
};

export default function CreatePollButton({
    pollQuestion,
    isSubmitting,
}: CreatePollButtonProps) {
    return (
        <button
            disabled={isSubmitting}
            className={`flex items-center justify-center h-8 w-20 rounded-full text-regularTextDark ml-auto text-sm ${
                !pollQuestion || isSubmitting
                    ? 'bg-gray-500 hover:bg-gray-600'
                    : 'bg-highlight dark:bg-highlightDark hover:bg-highlightHover dark:hover:bg-highlightDarkHover'
            }`}
            title={pollQuestion ? undefined : 'Please enter a message'}
        >
            {isSubmitting ? <ButtonBusy /> : <MdOutlineStart size="1.5em" />}
        </button>
    );
}
