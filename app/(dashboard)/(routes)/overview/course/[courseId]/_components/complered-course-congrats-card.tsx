import { Button } from "@/components/ui/button";
import { PartyPopper } from "lucide-react";
import Link from "next/link";

const CompletedCourseCongratsCard = () => {
    return (
        <div 
            className="container flex flex-col space-y-4 py-6 px-4 sm:px-6 lg:px-4 hover:shadow-sm"
            role="article"
            aria-label="Course completion congratulations"
        >
            <h3 className="text-wrap mx-auto"><span>
                Congrats! <PartyPopper className="inline" aria-hidden="true" /> <br/> 
                This course already finished!

            </span>
            </h3>
            <Link 
            className="mx-auto"
                href={'/overview'} 
                aria-label="Browse more courses"
            >
                <Button variant='link'>Find more courses</Button>
            </Link>
        </div>
    );
}
 
export default CompletedCourseCongratsCard;