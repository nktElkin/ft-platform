"use client";

import { useCallback, useState } from "react";
import SearchLine from "./search";
import ContentBox from "./content-box";
import { Category } from "@prisma/client";
import { FilterVariant, SearchFilter } from "../../tutor/_components/search-filter";
import { formatCategoriesFilterList } from "../../tutor/_components/tutor-page-layout";

interface OverviewPageProps {
  categories: Category[];
}

const OverviewPage = ({ categories }: OverviewPageProps) => {
  const [content, setContent] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [requestFilter, setRequestFilter] = useState<{
    variant: FilterVariant;
    value: string | boolean;
    label: string;
  } | null>();

  const handleRequest = useCallback((data: any) => { setContent(data); }, []);
  const handleRequestFilter = useCallback(
    (filter: { variant: FilterVariant, value: string; label: string } | null) => {
      setRequestFilter(filter);
    }, []);

  const handleLoading = useCallback((loading: boolean) => {
    setIsLoading(loading);
  }, []);

  return (
    <section className="w-full h-full flex flex-col space-y-4">
      <div className="bg-background md:flex md:flex-row">
        <div className="flex-grow max-w-xl mx-auto mb-3 md:mb-0 space-y-2">
          <SearchLine onRequest={handleRequest} onLoading={handleLoading} />
          <div className="flex flex-row space-x-2">
            <SearchFilter filtersList={formatCategoriesFilterList(categories)}
              filterLabel="category" filterVariant='category' onSetFilter={handleRequestFilter} />
          </div>
        </div>
      </div>
      <ContentBox
        content={content}
        isLoading={isLoading}
        requestFilter={requestFilter}
        categories={categories}
      />
    </section>
  );
};

export default OverviewPage;
