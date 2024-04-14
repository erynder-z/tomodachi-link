import { useState } from 'react';
import { MdSend } from 'react-icons/md';
import { FaRegSmileBeam } from 'react-icons/fa';
import ButtonBusy from '../../../../UiElements/LoadingSpinner/ButtonBusy';
import { Tooltip } from 'react-tooltip';
import useTheme from '../../../../../hooks/useTheme';

type ChatroomInputProps = {
    inputMessage: string;
    setInputMessage: React.Dispatch<React.SetStateAction<string>>;
    sendMessage: () => void;
    onTyping: () => void;
    isSubmitting: boolean;
    setShowEmojiPicker: React.Dispatch<React.SetStateAction<boolean>>;
};

/**
 * Chatroom input component for typing and sending messages.
 *
 * @component
 * @param {ChatroomInputProps} props - The props object.
 * @param {string} props.inputMessage - The current input message.
 * @param {React.Dispatch<React.SetStateAction<string>>} props.setInputMessage - The function to set the input message.
 * @param {Function} props.sendMessage - The function to send a message.
 * @param {Function} props.onTyping - The function to handle typing events.
 * @param {boolean} props.isSubmitting - A flag indicating whether a message is being submitted.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} props.setShowEmojiPicker - The function to set the visibility of the emoji picker.
 * @returns {JSX.Element} The rendered ChatroomInput component.
 */
export default function ChatroomInput({
    inputMessage,
    setInputMessage,
    sendMessage,
    onTyping,
    isSubmitting,
    setShowEmojiPicker,
}: ChatroomInputProps): JSX.Element {
    const { isMobileDevice } = useTheme();
    const [isInputFocused, setIsInputFocused] = useState(false);

    const isButtonDisabled = isSubmitting || inputMessage.trim() === '';

    /**
     * Handles the change in the input field.
     *
     * @param {React.ChangeEvent<HTMLInputElement>} e - The change event.
     * @return {void} No return value.
     */
    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ): void => {
        setInputMessage(e.target.value);
        onTyping();
    };

    /**
     * Handles keydown events in the input field.
     *
     * @param {React.KeyboardEvent<HTMLInputElement>} e - The keydown event.
     * @return {void} No return value.
     */
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
        if (e.key === 'Enter' && e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    /**
     * JSX content for the chat input field.
     * @type {JSX.Element}
     */
    const ChatInputContent: JSX.Element = (
        <>
            <input
                type="text"
                name="chatInput"
                value={inputMessage}
                autoComplete="off"
                onChange={handleInputChange}
                className={`py-2.5 px-4 pr-12 text-sm   bg-transparent border-0 appearance-none focus:outline-none focus:ring-0 peer ${
                    isSubmitting
                        ? 'text-gray-500'
                        : 'text-regularText dark:text-regularTextDark'
                }`}
                placeholder=" "
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
                onKeyDown={handleKeyDown}
            />
            <label
                htmlFor="chatInput"
                className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-4 origin-[0] peer-focus:left-0 peer-focus:font-bold peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 px-4 -z-10 peer-focus:bg-highlight peer-focus:dark:bg-highlightDark peer-focus:rounded peer-focus:px-2 peer-focus:text-regularTextDark"
            >
                Enter a message...
            </label>
        </>
    );

    /**
     * JSX content for the emoji button.
     * @type {JSX.Element}
     */
    const EmojiButtonContent: JSX.Element = (
        <>
            <button
                data-tooltip-id="chat-emoji-tooltip"
                data-tooltip-content="Insert emoji"
                data-tooltip-variant="dark"
                data-tooltip-delay-show={500}
                data-tooltip-hidden={isMobileDevice}
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowEmojiPicker(true);
                }}
                className="absolute bottom-4 right-4 text-regularText dark:text-regularTextDark hover:text-highlight dark:hover:text-highlightDark duration-300"
            >
                <FaRegSmileBeam />
            </button>
            <Tooltip
                id="chat-emoji-tooltip"
                style={{ fontSize: '0.75rem', zIndex: 99 }}
            />
        </>
    );

    /**
     * JSX content for the bottom border of the input field.
     * @type {JSX.Element}
     */
    const InputBottomBorder: JSX.Element = (
        <div className="w-full h-1 overflow-hidden">
            <div
                className={`h-full w-full  ${
                    isInputFocused
                        ? 'bg-highlight dark:bg-highlightDark'
                        : 'animate-colorChangeAnimationBright dark:animate-colorChangeAnimationDark'
                } `}
            />
        </div>
    );

    /**
     * JSX content for the send button.
     * @type {JSX.Element}
     */
    const SendButtonContent: JSX.Element = (
        <div className="relative">
            <button
                data-tooltip-id="chat-send-message-tooltip"
                data-tooltip-content="Send message (Ctrl + Enter)"
                data-tooltip-variant="dark"
                data-tooltip-delay-show={500}
                data-tooltip-hidden={!isMobileDevice}
                disabled={isButtonDisabled}
                onClick={sendMessage}
                className={`flex items-center justify-center px-4 md:px-8 h-full  text-regularTextDark text-sm ${
                    !inputMessage
                        ? 'bg-gray-500 hover:bg-gray-600'
                        : 'bg-highlight dark:bg-highlightDark hover:bg-highlightHover dark:hover:bg-highlightDarkHover duration-300'
                }`}
            >
                {isSubmitting ? <ButtonBusy /> : <MdSend size="1.5em" />}
            </button>
            {!isButtonDisabled && (
                <Tooltip
                    id="chat-send-message-tooltip"
                    style={{ fontSize: '0.75rem', zIndex: 99 }}
                />
            )}
        </div>
    );

    /**
     * The rendered ChatroomInput component.
     * @type {JSX.Element}
     */
    return (
        <div className="flex sticky bottom-4 right-40 z-0 bg-card dark:bg-cardDark h-12">
            <div className="relative flex justify-end flex-col w-full ">
                {ChatInputContent}
                {EmojiButtonContent}
                {InputBottomBorder}
            </div>
            {SendButtonContent}
        </div>
    );
}
