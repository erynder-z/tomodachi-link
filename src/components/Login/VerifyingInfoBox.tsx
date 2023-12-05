import { Blocks } from 'react-loader-spinner';
import { motion } from 'framer-motion';

export default function VerifyingInfoBox() {
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
