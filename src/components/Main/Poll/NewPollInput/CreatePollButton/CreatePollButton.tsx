import ButtonBusy from '../../../../UiElements/LoadingSpinner/ButtonBusy';
import { MdOutlineStart } from 'react-icons/md';
import { CreatedPollDataType } from '../../../../../types/createdPollDataType';

type CreatePollButtonProps = {
    pollData: CreatedPollDataType;
    isSubmitting: boolean;
};

export default function CreatePollButton({
    pollData,
    isSubmitting,
}: CreatePollButtonProps) {
    const { question, options } = pollData;

    const isButtonDisabled =
        !question ||
        isSubmitting ||
        options.some((option) => option.trim() === '');

    return (
        <button
            disabled={isButtonDisabled}
            className={`flex items-center justify-center h-8 w-20 rounded-full text-regularTextDark ml-auto text-sm ${
                isButtonDisabled
                    ? 'bg-gray-500 hover:bg-gray-600'
                    : 'bg-highlight dark:bg-highlightDark hover:bg-highlightHover dark:hover:bg-highlightDarkHover'
            }`}
            title={
                isButtonDisabled
                    ? 'Please enter a message and ensure all options are filled'
                    : undefined
            }
        >
            {isSubmitting ? <ButtonBusy /> : <MdOutlineStart size="1.5em" />}
        </button>
    );
}
