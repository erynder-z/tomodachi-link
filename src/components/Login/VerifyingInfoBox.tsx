import { Blocks } from 'react-loader-spinner';
import { motion } from 'framer-motion';

/**
 * Renders a component for displaying a verifying info box.
 *
 * @return {JSX.Element} The JSX element for the verifying info box.
 */
export default function VerifyingInfoBox(): JSX.Element {
    return (
        <motion.div
            key="verifyingInfoBox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col justify-center items-center h-full"
        >
            <Blocks
                visible={true}
                height="80"
                width="80"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
            />
            Verifying...
        </motion.div>
    );
}
