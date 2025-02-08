"use client";

import {useCallback, useState } from "react";
import SearchLine from "./search";
import { CategoryFilter } from "./filter-category";
import ContentBox from "./content-box";
import { Category } from "@prisma/client";

interface PageLayoutProps {
  categories: Category[];
}

const PageLayout = ({ categories }: PageLayoutProps) => {
  const [content, setContent] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [requestFilter, setRequestFilter] = useState<{
    value: string;
    label: string;
  } | null>();

  const handleRequest = useCallback((data: any) => {
    setContent(data);
  }, []);

  const handleRequestFilter = useCallback(
    (filter: { value: string; label: string } | null) => {
      setRequestFilter(filter);
    },
    [],
  );

  const handleLoading = useCallback((loading: boolean) => {
    setIsLoading(loading);
  }, []);

  return (
    <section className="w-full h-full flex flex-col space-y-4">
      <div className="bg-background md:flex md:flex-row">
        <div className="flex-grow max-w-xl mx-auto mb-3 md:mb-0 space-y-2">
          <SearchLine onRequest={handleRequest} onLoading={handleLoading} />
          <CategoryFilter
            categories={categories}
            onSetFilter={handleRequestFilter}
            onLoading={handleLoading}
          />
        </div>
      </div>
          <ContentBox
            content={content}
            isLoading={isLoading}
            requestFilter={requestFilter}
          />
    </section>
  );
};

export default PageLayout;
