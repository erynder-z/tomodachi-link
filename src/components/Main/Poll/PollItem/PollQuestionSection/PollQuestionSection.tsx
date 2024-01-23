import { RetrievedPollDataType } from '../../../../../types/pollTypes';

type PollQuestionSectionProps = {
    pollData: RetrievedPollDataType;
};

/**
 * React component for rendering the question section of a poll.
 *
 * @component
 * @param {PollQuestionSectionProps} props - The component props.
 * @param {RetrievedPollDataType} props.pollData - The poll data containing the question.
 * @returns {JSX.Element} - Rendered PollQuestionSection component.
 */
export default function PollQuestionSection({
    pollData,
}: PollQuestionSectionProps): JSX.Element {
    const { question } = pollData;
    /**
     * Renders the question section of the poll.
     * @returns {JSX.Element} - Rendered question section.
     */
    return <h1 className="text-xl font-bold">{question}</h1>;
}
