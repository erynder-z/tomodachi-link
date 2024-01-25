import { ReactMarkdown } from 'react-markdown/lib/react-markdown';

type PostTextSectionProps = {
    text: string | undefined;
};

/**
 * Represents a component for rendering the text section of a post.
 *
 * @component
 * @param {PostTextSectionProps} props - The component properties.
 * @returns {JSX.Element} The rendered PostTextSection component.
 */
export default function PostTextSection({
    text,
}: PostTextSectionProps): JSX.Element {
    /**
     * The rendered PostTextSection component.
     *
     * @type {JSX.Element}
     */
    return (
        <div className="text-justify ">
            {text && (
                <ReactMarkdown className="break-words p-4">
                    {text}
                </ReactMarkdown>
            )}
        </div>
    );
}
