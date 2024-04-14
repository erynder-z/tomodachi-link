import ButtonBusy from '../../../../UiElements/LoadingSpinner/ButtonBusy';
import { MdOutlineStart } from 'react-icons/md';
import { CreatedPollDataType } from '../../../../../types/pollTypes';
import { motion } from 'framer-motion';
import { Tooltip } from 'react-tooltip';
import useTheme from '../../../../../hooks/useTheme';

type CreatePollButtonProps = {
    pollData: CreatedPollDataType;
    isSubmitting: boolean;
};

/**
 * CreatePollButton component for submitting a new poll.
 *
 * @component
 * @param {CreatePollButtonProps} props - The props object.
 * @param {CreatedPollDataType} props.pollData - The poll data.
 * @param {boolean} props.isSubmitting - Indicates whether the form is currently submitting.
 * @returns {JSX.Element} The rendered CreatePollButton component.
 */
export default function CreatePollButton({
    pollData,
    isSubmitting,
}: CreatePollButtonProps): JSX.Element {
    const { isMobileDevice } = useTheme();
    const { question, options } = pollData;

    const isButtonDisabled =
        !question ||
        isSubmitting ||
        options.some((option) => option.trim() === '');

    /**
     * The rendered CreatePollButton component.
     *
     * @returns {JSX.Element}
     */
    return (
        <>
            <motion.button
                data-tooltip-id="poll-send-tooltip"
                data-tooltip-content="Upload poll"
                data-tooltip-variant="dark"
                data-tooltip-delay-show={500}
                data-tooltip-hidden={isMobileDevice}
                disabled={isButtonDisabled}
                whileTap={{ scale: 0.97 }}
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
                {isSubmitting ? (
                    <ButtonBusy />
                ) : (
                    <MdOutlineStart size="1.5em" />
                )}
            </motion.button>
            {!isButtonDisabled && (
                <Tooltip
                    id="poll-send-tooltip"
                    style={{ fontSize: '0.75rem' }}
                />
            )}
        </>
    );
}
