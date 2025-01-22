import { FileX } from "lucide-react";
import RemoveCourseModuleBtn from "./cross-btn";

interface PreviewCardProps {
    object: any;
    variant? : 'course' | 'module';
    courseCategoty? : string;
    isPublished? : boolean;
}

const PreviewCard = ({ object, variant, courseCategoty, isPublished }: PreviewCardProps) => {
    const title =   object?.title ? new String(object?.title) : '[No Title yet]';
    const description =   object?.description ? new String(object?.description) : '[No Description yet]';
    return (
        <div aria-roledescription={`${variant} preview-card`}
            className={`h-fit flex flex-col w-full rounded-md border border-input bg-transparent p-3 text-base shadow-sm md:text-sm relative`}>
            {variant === 'course' && <img src={`${object?.wallpaperUrl}`} alt="object Image" className="w-full h-40 object-cover rounded-t-md mb-3"/>}
                <div className={`text-start`}>
                    <h3 className={`text-lg font-semibold ${variant === 'course' && 'mb-2'}`}>{title}</h3>
                    {variant === 'course' && <p className="text-sm text-zinc-500 mb-2">{description.length > 120 ? `${description.slice(0,120)}...` : `${description}`}</p>}
                    <div className={`flex flex-row justify-start space-x-2 text-zinc-500 text-xs *:lowercase *:px-2 *:py-1 *:rounded-lg`}>
                        {variant === 'course' && <span className="bg-slate-200">{courseCategoty}</span>}
                        <span className={`${object.isPublished ? 'bg-green-200' : 'bg-slate-200'}`}>{object?.isPublished ? "Published" : "Draft"}</span>
                    </div>
                </div>
                {variant === 'module' && <RemoveCourseModuleBtn courseId={object?.courseId} moduleId={object?.id} />}
        </div>
    );
}

export default PreviewCard;