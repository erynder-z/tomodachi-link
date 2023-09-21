import React from 'react';
import NewPollInput from '../../Poll/NewPollInput/NewPollInput';
import { motion } from 'framer-motion';

export default function NewPollSection() {
    return (
        <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col min-h-[calc(100vh_-_3rem)] lg:min-h-full lg:p-4 md:p-0 pb-4 bg-background2 dark:bg-background2Dark text-regularText dark:text-regularTextDark shadow-lg rounded lg:rounded-lg"
        >
            <h1 className="text-center text-xl font-bold mb-4">
                Create new poll
            </h1>
            <NewPollInput />
            <div className="mt-4 text-sm">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero
                doloremque repudiandae eligendi unde earum error tenetur
                adipisci autem eaque repellat?
            </div>
        </motion.div>
    );
}
