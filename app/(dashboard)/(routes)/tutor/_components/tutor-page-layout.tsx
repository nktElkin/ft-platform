'use client';
import { Category, Course } from "@prisma/client";
import { useCallback, useState } from "react";
import SearchLine from "../../overview/_components/search";
import ContentBox from "../../overview/_components/content-box";
import { FilterVariant, SearchFilter } from "./search-filter";

interface TutorDataPageProps {
    categories: Category[];
}

export const formatCategoriesFilterList = (categories: Category[]) => {
    if (!categories) return [];
    const list = categories.map((category) => ({
        value: category?.id,
        label: category?.categoryName,
    }));
    return list;
}

export const formatStatusFilterList = () => {
    const list = [];
    list.push({ value: 'true', label: "published" });
    list.push({ value: 'false', label: "draft" });
    return list;
}

// TODO: add button breate new course, add edit course button

const TutorOverviewPage = ({ categories }: TutorDataPageProps) => {
  const [content, setContent] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const [requestFilter, setRequestFilter] = useState<{
    variant: FilterVariant;
    value: string | boolean;
    label: string;
  } | null>();

  const handleRequest = useCallback((data: any) => {
    setContent(data);
  }, []);

  const handleRequestFilter = useCallback(
    (filter: {variant : FilterVariant , value: string; label: string } | null) => {
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
            <div className="flex flex-row space-x-2">
                <SearchFilter filtersList={formatCategoriesFilterList(categories)} filterLabel="category" filterVariant='category' onSetFilter={handleRequestFilter} />
                <SearchFilter filtersList={formatStatusFilterList()} filterLabel="status" filterVariant='status' onSetFilter={handleRequestFilter} />
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
}
 
export default TutorOverviewPage;