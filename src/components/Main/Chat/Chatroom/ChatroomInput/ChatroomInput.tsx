import React from 'react';
import { MdSend } from 'react-icons/md';

type ChatroomInputProps = {
    inputMessage: any;
    setInputMessage: React.Dispatch<any>;
    sendMessage: () => void;
};

export default function ChatroomInput({
    inputMessage,
    setInputMessage,
    sendMessage,
}: ChatroomInputProps) {
    return (
        <div className="flex mt-4">
            <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 p-2 bg-canvas text-cBlack border border-gray-300 rounded-l"
            />
            <button
                onClick={sendMessage}
                className={`flex items-center justify-center  w-12 text-white ml-auto text-sm ${
                    !inputMessage
                        ? 'bg-gray-500 hover:bg-gray-600'
                        : 'bg-blue-500 hover:bg-blue-600'
                }`}
                title={inputMessage ? undefined : 'Please enter a message'}
            >
                <MdSend />
            </button>
        </div>
    );
}
