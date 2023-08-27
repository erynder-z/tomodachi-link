import React from 'react';
import { getCorrectUserpicFormat } from '../../../../../utilities/getCorrectUserpicFormat';
import { motion } from 'framer-motion';

type SuggestionCardRandomInfoProps = {
    userpic: {
        data: {
            data: Buffer;
        };
        contentType: string;
    };
    firstName: string;
    lastName: string;
};

export default function SuggestionCardRandomInfo({
    userpic,
    firstName,
    lastName,
}: SuggestionCardRandomInfoProps) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col gap-4"
        >
            <img
                className="w-20 h-20 object-cover mx-auto rounded-full border-4 border-regularText dark:border-regularTextDark"
                src={`data:image/png;base64,${getCorrectUserpicFormat(
                    userpic
                )}`}
                alt="User avatar"
            />
            <p className="font-semibold text-sm break-all text-regularText dark:text-regularTextDark">
                {firstName} {lastName}
            </p>
        </motion.div>
    );
}
