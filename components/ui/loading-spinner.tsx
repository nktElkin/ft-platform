import { CircleCheck, CircleX, Loader } from "lucide-react";

interface LoadingSpinnerProps{
    state: 'loading' | 'updated' | 'error' | '';
    size?: number;
}

const LoadingSpinner = ({ state, size}: LoadingSpinnerProps): JSX.Element => {
    switch(state) {
        case 'loading':
            if(size)return <Loader className="animate-spin" size={size}/>
            return <Loader className="animate-spin"/>;
        case 'updated':
            if(size)return <CircleCheck size={size}/>
            return <CircleCheck  />;
        case 'error':
            if(size) return <CircleX size={size}/>
            return <CircleX/>;
        default:
            return <></>;
    }
};
 
export default LoadingSpinner;