"use client";

import { Search } from "lucide-react";
// import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";

export default function SearchPage() {
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <div className="max-w-xl mx-auto flex flex-col items-center">
            {/* <div className="flex gap-2">
                <div className="flex-1">
                    <Input
                            type="search"
                            placeholder="Search for anything..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full"
                            aria-label="Search input"
                        />
                    <input type="text" />
                </div>
                <Button
                    type="submit"
                    aria-label="Perform search"
                >
                    <Search className="h-4 w-4 mr-2" />
                    Search
                </Button>
            </div> */}
            <div className="flex w-full max-w-sm items-center space-x-2">
                <Input type="search" placeholder="All you need" />
                <Button type="submit">Subscribe</Button>
            </div>
        </div>
    );
}
// </div></Button></div>