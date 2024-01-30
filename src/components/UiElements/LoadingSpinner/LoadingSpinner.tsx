import { Oval } from 'react-loader-spinner';
import useTheme from '../../../hooks/useTheme';
import { AnimatePresence, motion } from 'framer-motion';

type LoadingSpinnerProps = {
    message?: string;
};

/**
 * React component for rendering a loading spinner with an optional message.
 *
 * @component
 * @param {LoadingSpinnerProps} props - The component props.
 * @param {string} [props.message] - Optional message to display alongside the loading spinner.
 * @returns {JSX.Element} The rendered LoadingSpinner component.
 */
export default function LoadingSpinner({
    message,
}: LoadingSpinnerProps): JSX.Element {
    const { colorScheme } = useTheme();

    const brightThemeColor = 'rgba(0,0,0,0.4)';
    const darkThemeColor = 'rgba(255,255,255,0.4)';
    const highlightColor = '#0598BC';
    const darkHighlightColor = '#BC05BC';
    const firstColor =
        colorScheme === 'bright' ? highlightColor : darkHighlightColor;
    const secondColor =
        colorScheme === 'bright' ? brightThemeColor : darkThemeColor;

    /**
     * Render the LoadingSpinner component.
     *
     * @type {JSX.Element}
     */
    return (
        <div className="w-full h-full flex flex-col justify-center items-center gap-4">
            <AnimatePresence>
                {message && (
                    <motion.h1
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-xl font-bold text-center m-0 text-loading dark:text-loadingDark"
                    >
                        {message}
                    </motion.h1>
                )}{' '}
            </AnimatePresence>
            <Oval
                height={30}
                width={30}
                color={firstColor}
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel="oval-loading"
                secondaryColor={secondColor}
                strokeWidth={5}
                strokeWidthSecondary={5}
            />
        </div>
    );
}
