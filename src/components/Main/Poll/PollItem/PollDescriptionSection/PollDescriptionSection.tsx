import { RetrievedPollDataType } from '../../../../../types/pollTypes';

type PollDescriptionSectionProps = {
    pollData: RetrievedPollDataType;
};

/**
 * React component for rendering the description section of a poll.
 *
 * @component
 * @param {PollDescriptionSectionProps} props - The component props.
 * @param {RetrievedPollDataType} props.pollData - The poll data containing the description.
 * @returns {JSX.Element} - Rendered PollDescriptionSection component.
 */
export default function PollDescriptionSection({
    pollData,
}: PollDescriptionSectionProps): JSX.Element {
    const { description } = pollData;
    /**
     * Renders the description section of the poll.
     * @returns {JSX.Element} - Rendered description section.
     */
    return <div className="text-base">{description}</div>;
}
