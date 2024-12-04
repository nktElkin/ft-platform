"use client";

import { Search } from "lucide-react";
// import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function SearchPage() {
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-2xl font-bold mb-8">Search</h1>
                
                <div className="flex gap-2">
                    <div className="flex-1">
                        {/* <Input
                            type="search"
                            placeholder="Search for anything..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full"
                            aria-label="Search input"
                        /> */}
                        <input type="text" />
                    </div>
                    <Button 
                        type="submit"
                        aria-label="Perform search"
                    >
                        <Search className="h-4 w-4 mr-2" />
                        Search
                    </Button>
                </div>

                {/* Search results section */}
                <div className="mt-8">
                    {/* You can add search results here */}
                    <p className="text-muted-foreground text-center">
                        Enter your search query above to find results
                    </p>
                </div>
            </div>
        </div>
    );
}
// </div></Button></div>