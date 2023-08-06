import React from 'react';
import { getCorrectUserpicFormat } from '../../../../utilities/getCorrectUserpicFormat';
import { TbLink } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import { MinimalUserTypes } from '../../../../types/minimalUserTypes';

type SuggestionCardRandomProps = {
    userData: MinimalUserTypes;
};

export default function SuggestionCardRandom({
    userData,
}: SuggestionCardRandomProps) {
    const { userpic, firstName, lastName, _id } = userData;

    return (
        <div className="w-5/6 lg:w-44 flex mx-auto">
            <div className="w-full flex flex-col text-center p-4 bg-card shadow-lg">
                <section>
                    <img
                        className="w-20 h-20 object-cover mx-auto relative -top-12 border-4 border-cBlue"
                        src={`data:image/png;base64,${getCorrectUserpicFormat(
                            userpic
                        )}`}
                        alt="User avatar"
                    />
                    <p className="font-semibold text-md my-5 break-all relative -top-5">
                        {firstName} {lastName}
                    </p>
                </section>
                <div className="flex justify-around items-center mt-auto">
                    <Link
                        to={`/users/${_id}`}
                        className="flex items-center w-max gap-4 py-2 text-regularText "
                    >
                        <TbLink className="text-xl hover:scale-125 hover:text-cRed transition-all" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
