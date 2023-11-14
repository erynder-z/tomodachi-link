import { useState } from 'react';
import { MdSend } from 'react-icons/md';
import { FaRegSmileBeam } from 'react-icons/fa';
import ButtonBusy from '../../../../UiElements/LoadingSpinner/ButtonBusy';

type ChatroomInputProps = {
    inputMessage: string;
    setInputMessage: React.Dispatch<React.SetStateAction<string>>;
    sendMessage: () => void;
    onTyping: () => void;
    isSubmitting: boolean;
    setShowEmojiPicker: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ChatroomInput({
    inputMessage,
    setInputMessage,
    sendMessage,
    onTyping,
    isSubmitting,
    setShowEmojiPicker,
}: ChatroomInputProps) {
    const [isInputFocused, setIsInputFocused] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputMessage(e.target.value);
        onTyping();
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const ChatInputContent = (
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

    const EmojiButtonContent = (
        <button
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowEmojiPicker(true);
            }}
            className="absolute bottom-4 right-4 text-regularText dark:text-regularTextDark hover:text-highlight dark:hover:text-highlightDark duration-300"
        >
            <FaRegSmileBeam />
        </button>
    );

    const InputBottomBorder = (
        <div className="w-full h-0.5 overflow-hidden">
            <div
                className={`h-full w-full  ${
                    isInputFocused
                        ? 'bg-highlight dark:bg-highlightDark'
                        : 'animate-colorChangeAnimationBright dark:animate-colorChangeAnimationDark'
                } `}
            />
        </div>
    );

    const SendButtonContent = (
        <button
            disabled={isSubmitting}
            onClick={sendMessage}
            className={`flex items-center justify-center w-24 h-full  text-regularTextDark text-sm ${
                !inputMessage
                    ? 'bg-gray-500 hover:bg-gray-600'
                    : 'bg-highlight dark:bg-highlightDark hover:bg-highlightHover dark:hover:bg-highlightDarkHover duration-300'
            }`}
            title={
                inputMessage ? 'Shift+Enter to send' : 'Please enter a message'
            }
        >
            {isSubmitting ? <ButtonBusy /> : <MdSend size="1.5em" />}
        </button>
    );

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
