import { CircleCheck, CircleX, Loader } from "lucide-react";

interface LoadingSpinnerProps{
    state: 'loading' | 'updated' | 'error' | '';
}

const LoadingSpinner = ({ state }: LoadingSpinnerProps): JSX.Element => {
    switch(state) {
        case 'loading':
            return <Loader className="animate-spin" />;
        case 'updated':
            return <CircleCheck  />;
        case 'error':
            return <CircleX/>;
        default:
            return <></>;
    }
};
 
export default LoadingSpinner;