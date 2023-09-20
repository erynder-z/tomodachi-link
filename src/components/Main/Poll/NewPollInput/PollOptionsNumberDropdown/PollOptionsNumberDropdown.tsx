type NumberDropdownProps = {
    handleOptionsNumberSelect: (selectedNumber: number) => void;
};

export default function PollOptionsNumberDropdown({
    handleOptionsNumberSelect,
}: NumberDropdownProps) {
    const numbers = [1, 2, 3, 4, 5];

    return (
        <div className="relative z-0">
            <select
                className="block py-2.5 px-0 text-sm text-regularText dark:text-regularTextDark bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 cursor-pointer"
                onChange={(e) =>
                    handleOptionsNumberSelect(Number(e.target.value))
                }
            >
                {numbers.map((number) => (
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
                className="absolute text-sm text-regularText dark:text-regularTextDark duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] "
            >
                Select number of options
            </label>
        </div>
    );
}
