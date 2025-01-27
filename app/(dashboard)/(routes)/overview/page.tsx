
'use client'

import SearchLine from "./_components/search";
import ContentBox from "./_components/content-box";
import { Course } from "@prisma/client";
import { useEffect, useState } from "react";
import { db } from "@/lib/db";
import { getSession } from "@/lib/utils";
import { get } from "http";

export default function SearchPage() {
    const [content, setContent] = useState();
    const [isLoading, setIsLoading] = useState(false);
    return (
        <>
        <div className="top-0 sticky z-10 bg-background">
            <div className="max-w-xl mx-auto flex flex-row items-center justify-around">
                <SearchLine onRequest={setContent} onLoading={setIsLoading}/>
            </div>
        </div>
            <ContentBox content={content}/>
        </>
    );
}
