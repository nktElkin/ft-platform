import RemoveCourseModuleBtn from "./cross-btn";

interface PreviewCardProps {
    object: any;
    variant? : 'course' | 'module'
}

const PreviewCard = ({ object, variant }: PreviewCardProps) => {
    const title =   object?.title ? new String(object?.title) : '[No Title yet]';
    const description =   object?.description ? new String(object?.description) : '[No Description yet]';
    return (
        <div aria-roledescription={`${variant} preview-card`}
            className={`h-fit flex flex-col w-full rounded-md border border-input bg-transparent p-3 text-base shadow-sm md:text-sm relative`}>
            {variant === 'course' && <img src={`${object?.wallpaperUrl}`} alt="object Image" className="w-full h-40 object-cover rounded-t-md mb-3"/>}
                <div className="text-start">
                    <h3 className={`text-lg font-semibold ${variant === 'course' && 'mb-2'}`}>{title}</h3>
                {variant === 'course' && 
                    <p className="text-sm text-zinc-500">{description.length > 120 ? `${description.slice(0,120)}...` : `${description}`}</p>}
                </div>
                {variant === 'module' && <RemoveCourseModuleBtn courseId={object?.courseId} moduleId={object?.id} />}
        </div>
    );
}

export default PreviewCard;