import { useRef, useState } from 'react';

type SearchInputProps = {
    searchText: string;
    setSearchText: React.Dispatch<React.SetStateAction<string>>;
};

export default function SearchInput({
    searchText,
    setSearchText,
}: SearchInputProps) {
    const [isInputFocused, setIsInputFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const handleTextareaChange = (event: React.ChangeEvent<HTMLInputElement>) =>
        setSearchText(event.target.value);
    return (
        <>
            <input
                ref={inputRef}
                name="searchInput"
                required
                autoComplete="off"
                autoFocus
                className="block py-2.5 px-0 w-full text-sm text-regularTextDark bg-transparent border-0  appearance-none focus:outline-none focus:ring-0 focus:border-highlight dark:focus:border-highlightDark peer"
                placeholder=" "
                value={searchText}
                onChange={handleTextareaChange}
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
            />
            <label
                htmlFor="searchInput"
                className="absolute text-sm text-regularTextDark duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-highlight dark:peer-focus:text-highlightDark peer-focus:font-bold peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
                Search for user, post or poll
            </label>
            <div className=" w-full h-1 rounded-full overflow-hidden">
                <div
                    className={`h-full w-full  ${
                        isInputFocused
                            ? 'bg-highlight dark:bg-highlightDark '
                            : 'animate-colorChangeAnimationBright dark:animate-colorChangeAnimationDark '
                    } `}
                />
            </div>
        </>
    );
}
