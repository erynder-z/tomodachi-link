import { Blocks } from 'react-loader-spinner';
import { motion } from 'framer-motion';

/**
 * Renders a component indicating that the user is being logged in.
 *
 * @component
 * @return {JSX.Element} The rendered logging-in information component.
 */
export default function LoggingInInfo(): JSX.Element {
    /**
     * Renders the LoggingInInfo component.
     *
     * @return {JSX.Element} The rendered LoggingInInfo component.
     */
    return (
        <motion.div
            key="loggingInInfo"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col justify-center items-center text-center text-3xl p-4 w-screen rounded text-regularTextDark bg-black/60"
        >
            <Blocks
                visible={true}
                height="80"
                width="80"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
            />
            You are being logged in!
        </motion.div>
    );
}
