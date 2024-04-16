type NumberDropdownProps = {
    handleOptionsNumberSelect: (selectedNumber: number) => void;
};

/**
 * PollOptionsNumberDropdown component for selecting the number of poll options.
 *
 * @component
 * @param {NumberDropdownProps} props - The props object.
 * @param {(selectedNumber: number) => void} props.handleOptionsNumberSelect - The function to handle the selection of the number of options.
 * @returns {JSX.Element} The rendered PollOptionsNumberDropdown component.
 */
export default function PollOptionsNumberDropdown({
    handleOptionsNumberSelect,
}: NumberDropdownProps): JSX.Element {
    const NUMBERS = [2, 3, 4, 5, 6];

    /**
     * The rendered PollOptionsNumberDropdown component.
     *
     * @returns {JSX.Element}
     */
    return (
        <div className="relative z-0">
            <select
                className="block py-2.5 px-2 text-sm text-regularText dark:text-regularTextDark bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 cursor-pointer"
                onChange={(e) =>
                    handleOptionsNumberSelect(Number(e.target.value))
                }
            >
                {NUMBERS.map((number) => (
                    <option
                        className="bg-card dark:bg-cardDark"
                        key={number}
                        value={number}
                    >
                        {number}
                    </option>
                ))}
            </select>

            <label
                htmlFor="numberDropdown"
                className="absolute text-sm px-2 text-regularText dark:text-regularTextDark duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] "
            >
                Select number of options
            </label>
        </div>
    );
}
