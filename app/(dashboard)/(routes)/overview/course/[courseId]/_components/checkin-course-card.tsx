import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import EnrolCourseBtn from "./enrol-course-btn";


const CheckInCourseCard = ({ progress, redirectHref }: { progress: number, redirectHref: string }) => {
    return (<div className="container flex flex-col space-y-4 py-6 px-4 sm:px-6 lg:px-4 hover:shadow-sm">
        {(progress === 0 && !redirectHref.includes('module')) && <EnrolCourseBtn redirectHref={redirectHref}/>}
        {(progress >= 0 && redirectHref.includes('module')) && (
            <>
            <div className="flex flex-col space-y-1">
                <Progress className="h-3" value={progress} max={100} aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} />
                <p className="text-xs">{progress}% already done!</p>
            </div>
        <Link
            aria-label="continue course button"
            type="link"
            href={redirectHref}
        >
            <Button className="w-full hover:outline-2 hover:outline-offset-2 hover:outline-slate-800">
                Continue learning
            </Button>
        </Link>
            </>
        )}
    </div>);
}

export default CheckInCourseCard;