import React from 'react';
import { RetrievedPollDataType } from '../../../../../types/retrievedPollDataType';

type PollDescriptionSectionProps = {
    pollData: RetrievedPollDataType;
};

export default function PollDescriptionSection({
    pollData,
}: PollDescriptionSectionProps) {
    const { description } = pollData;
    return <div className="text-base">{description}</div>;
}
