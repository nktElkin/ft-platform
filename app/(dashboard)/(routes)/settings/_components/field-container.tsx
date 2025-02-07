'use client'

import { ReactNode } from "react";

interface FieldContainerProps {
    children: ReactNode;
}

const FieldContainer = ({ children }: FieldContainerProps) => {
    return (
        <div className="flex flex-col space-y-1">
            {children}
        </div>
    );
}

export default FieldContainer;