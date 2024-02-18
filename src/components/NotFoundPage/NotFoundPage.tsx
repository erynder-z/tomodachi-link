import NotFoundImage from '../../assets/404_not_found.webp';

/**
 * React component representing the Not Found page.
 *
 * @component
 * @returns {JSX.Element} The rendered NotFoundPage component.
 */

export default function NotFoundPage() {
    return (
        <div className="w-full  min-h-[calc(100vh_-_3rem)] lg:min-h-full flex justify-center items-center ">
            <img className="object-fit" src={NotFoundImage} alt="Not Found" />
        </div>
    );
}
