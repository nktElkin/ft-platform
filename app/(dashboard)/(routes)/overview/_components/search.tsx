"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React, { memo, useEffect, useState } from "react";
import { toast } from "sonner";

interface SearchLineProps {
  onRequest: (data: any) => void;
  onLoading: (isLoading: boolean) => void;
}

const SearchLine = memo(function Searchline({
  onRequest,
  onLoading,
}: SearchLineProps) {
  const [query, setQuery] = useState("");

  const doSearch = async (query: string) => {
    onLoading(true);
    try {
      const response = await fetch(`/api/courses?query=${query}`, {
        method: "GET",
      });
      if (!response.ok) {
        switch (response.status) {
          case 400:
            toast.error("Bad request");
            break;
          case 403:
            toast.error("Unauthorized");
            break;
          case 404:
            toast.error("Course not found");
            break;
          default:
            toast.error("Failed to get courses");
        }
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      if (!data.courses.length) toast.error("No courses found");
      onRequest(data);
    } catch (error) {
      toast.error("Bad connection with server");
    } finally {
      setQuery("");
      onLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    doSearch(query);
  };

  useEffect(() => {
    doSearch(""); // Initial empty search on component mount
  }, []);

  return (
    <div className="relative flex w-full  items-center space-x-2">
      <form
        onSubmit={handleSubmit}
        className="flex w-full items-center space-x-2"
        role="search"
      >
        <Input
          type="search"
          className="bg-background"
          placeholder="All you need"
          value={query}
          onChange={(e) => setQuery(e.target.value.trim())}
          aria-label="Search"
        />
        <Button type="submit" aria-label="Submit search">
          <Search className="sm:hidden" />
          <span className="hidden sm:block">Search</span>
        </Button>
      </form>
    </div>
  );
});

export default SearchLine;
