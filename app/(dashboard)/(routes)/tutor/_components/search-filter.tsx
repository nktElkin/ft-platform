"use client";

import { useMediaQuery } from "react-responsive";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useState } from "react";
import { DialogTitle } from "@radix-ui/react-dialog";

export type Filter = {
  value: string | boolean;
  label: string;
};

export type FilterVariant = 'category' | 'status';

interface SearchFilterProps {
  onSetFilter: (filter: { variant : FilterVariant , value: string; label: string } | null) => void;
  onLoading?: (loading: boolean) => void;
  filtersList: Filter[];
  filterLabel: string;
  filterVariant: FilterVariant;
}

export const SearchFilter = ({
  onSetFilter,
  onLoading,
  filtersList,
  filterLabel,
  filterVariant
}: SearchFilterProps) => {
  
    // data for content
  useEffect(() => {
    filtersList.unshift({ value: "", label: "all" }); // adding reset filter
  }, [filtersList]);

  // states for funcitionality
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery({ minWidth: 640 });
  const [selectedFilter, setSelectedFilter] = useState<Filter | null>(null);

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-fit justify-start">
            {selectedFilter ? <>{selectedFilter.label.toLowerCase()}</> : <>{filterLabel}</>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-fit p-0" align="start">
          <FiltersListUI
            setOpen={setOpen}
            setSelectedFilter={setSelectedFilter}
            onSetFilter={onSetFilter}
            filtersList={filtersList}
            filterLabel={filterLabel || ''}
            filterVariant={filterVariant || 'category'}
          />
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="w-fit justify-start">
          {selectedFilter ? <>{selectedFilter.label.toLowerCase()}</> : <>{filterLabel}</>}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DialogTitle className="hidden">Filter by status</DialogTitle>
        <div className="mt-4 border-t">
          <FiltersListUI
            setOpen={setOpen}
            setSelectedFilter={setSelectedFilter}
            onSetFilter={onSetFilter}
            filtersList={filtersList}
            filterLabel={filterLabel || ''}
            filterVariant={filterVariant || 'category'}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

function FiltersListUI({
  setOpen,
  setSelectedFilter,
  onSetFilter,
  filtersList,
  filterLabel,
  filterVariant,
}: {
  setOpen: (open: boolean) => void;
  setSelectedFilter: (status: Filter | null) => void;
  onSetFilter: (filter: { variant : FilterVariant , value: string; label: string } | null) => void;
  filtersList : Filter[];
  filterLabel: string;
  filterVariant: FilterVariant;
}) {
  return (
    <Command className="bg-background">
      <CommandInput placeholder={`Filter ${filterLabel}`}/>
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {filtersList.map((status: any) => (
            <CommandItem
            className="hover:underline"
            key={status.label}
            value={status.label}
            onSelect={(label) => {
              const selected = filtersList.find((filter) => filter.label === label) || null;
              setSelectedFilter(selected);
              onSetFilter({variant: filterVariant, value: selected?.value.toString() || '', label: selected?.label || ''});
              setOpen(false);
            }}
          >
              {status.label.toLowerCase()}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
