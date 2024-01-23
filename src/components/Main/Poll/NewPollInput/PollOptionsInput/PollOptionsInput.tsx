import { CreatedPollDataType } from '../../../../../types/pollTypes';
import { AnimatePresence, motion } from 'framer-motion';

type PollOptionsInputProps = {
    pollData: CreatedPollDataType;
    handlePollOptionInputChange: (index: number, value: string) => void;
};

/**
 * PollOptionsInput component for entering poll options.
 *
 * @component
 * @param {PollOptionsInputProps} props - The props object.
 * @param {CreatedPollDataType} props.pollData - The poll data.
 * @param {(index: number, value: string) => void} props.handlePollOptionInputChange - The function to handle poll option changes.
 * @returns {JSX.Element} The rendered PollOptionsInput component.
 */
export default function PollOptionsInput({
    pollData,
    handlePollOptionInputChange,
}: PollOptionsInputProps): JSX.Element {
    const { options } = pollData;

    /**
     * The rendered PollOptionsInput component.
     *
     * @returns {JSX.Element}
     */
    return (
        <div className="flex flex-col gap-4">
            <AnimatePresence>
                {options.map((option, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.1 }}
                    >
                        <div className="relative z-0">
                            <input
                                required
                                autoComplete="off"
                                id={`pollOption${i}`}
                                name={`pollOption${i}`}
                                className="block py-2.5 px-0 w-full text-sm text-regularText dark:text-regularTextDark bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 peer overflow-hidden resize-none"
                                placeholder=" "
                                value={option}
                                onChange={(e) =>
                                    handlePollOptionInputChange(
                                        i,
                                        e.target.value
                                    )
                                }
                            />
                            <label
                                htmlFor={`pollOption${i}`}
                                className="absolute text-sm text-regularText dark:text-regularTextDark duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:bg-highlight peer-focus:dark:bg-highlightDark peer-focus:rounded peer-focus:px-2 peer-focus:text-regularTextDark"
                            >
                                Option {i + 1}
                            </label>
                            <div className="absolute left-0 bottom-0 w-full h-0.5 overflow-hidden"></div>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}
