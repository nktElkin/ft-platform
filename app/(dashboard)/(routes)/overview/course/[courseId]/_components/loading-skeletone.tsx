import { Skeleton } from "@/components/ui/skeleton";

const LoadingSkeleton = () => (
    <div className="flex flex-col lg:flex lg:flex-row lg:space-x-5">
      <div className="lg:w-2/3 lg:grow mb-4 lg:mb-0">
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-64 w-full mt-4" />
      </div>
      <div className="lg:w-1/3">
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-24 w-full mt-4" />
      </div>
    </div>
  );

export default LoadingSkeleton;