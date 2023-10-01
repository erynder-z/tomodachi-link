import { RetrievedPollDataType } from '../../../../../types/pollTypes';

type PollQuestionSectionProps = {
    pollData: RetrievedPollDataType;
};

export default function PollQuestionSection({
    pollData,
}: PollQuestionSectionProps) {
    const { question } = pollData;
    return <h1 className="text-xl font-bold">{question}</h1>;
}
