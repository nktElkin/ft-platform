interface InputCoverProps {
    value?: string | null;
    onToggle: (value: boolean) => void;
    controllerState: boolean;
    inputVariant: string
    children?: React.ReactNode;
}

interface PreviewCardProps {
    object: any;
    variant? : 'course' | 'module'
}

const PreviewCard = ({ object, variant }: PreviewCardProps) => {
    const title =   object?.title ? new String(object?.title) : '[No Title yet]';
    const description =   object?.description ? new String(object?.description) : '[No Description yet]';
    return (
        <div aria-roledescription={`${variant} preview-card`}
            className={`h-fit flex flex-col w-full rounded-md border border-input bg-transparent p-3 text-base shadow-sm md:text-sm`}>
            {variant === 'course' && <img src={`${object?.wallpaperUrl}`} alt="object Image" className="w-full h-40 object-cover rounded-t-md mb-3"/>}
                <div className="text-start">
                    <h3 className="text-lg font-semibold mb-2">{title}</h3>
                    <p className="text-sm text-zinc-500">{description.length > 120 ? `${description.slice(0,120)}...` : `${description}`}</p>
                </div>
        </div>
    );
}

export default PreviewCard;