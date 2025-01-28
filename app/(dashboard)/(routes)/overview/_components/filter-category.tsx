"use client"

import { useMediaQuery } from 'react-responsive';
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { memo, useEffect, useState } from 'react';
import { Category } from '@prisma/client';
import { DialogTitle } from '@radix-ui/react-dialog';


type Filter = {
  value: string
  label: string
}

let categoriesList: Filter[] = []

interface CategoryFilterProps{
  onSetFilter: (filter: { value: string; label: string } | null) => void
  onLoading: (loading: boolean) => void
  categories: Category[];
}

export const CategoryFilter = ({onSetFilter, onLoading, categories}: CategoryFilterProps) => {
  // data for content
  useEffect(() => {
    categoriesList = categories.map((category) => ({
      value: category?.id,
      label: category?.categoryName}));
    categoriesList.push({value: '', label: 'All categories'})
  }, [])


  // states for funcitionality
  const [open, setOpen] = useState(false)
  const isDesktop = useMediaQuery({ minWidth: 640 });
  const [selectedFilter, setSelectedFilter] = useState<Filter | null>(null)

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-fit justify-start">
            {selectedFilter ? <>{selectedFilter.label}</> : <>category</>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-fit p-0" align="start">
          <StatusList setOpen={setOpen} setSelectedFilter={setSelectedFilter} onSetFilter={onSetFilter} />
        </PopoverContent>
      </Popover>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="w-fit justify-start">
          {selectedFilter ? <>{selectedFilter.label}</> : <>category</>}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
      <DialogTitle className='hidden'>Filter by status</DialogTitle>
        <div className="mt-4 border-t">
          <StatusList setOpen={setOpen} setSelectedFilter={setSelectedFilter} onSetFilter={onSetFilter}/>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

function StatusList({
  setOpen,
  setSelectedFilter,
  onSetFilter,
}: {
  setOpen: (open: boolean) => void
  setSelectedFilter: (status: Filter | null) => void,
  onSetFilter: (filter: any) => void
}) {
  return (
    <Command className='bg-background'>
      <CommandInput placeholder="Filter categories..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {categoriesList.map((status:any) => (
            <CommandItem
              key={status.value}
              value={status.value}
              onSelect={(value) => {
                setSelectedFilter(
                  categoriesList.find((category) => category.value === value) || null
                )
                onSetFilter(categoriesList.find((category) => category.value === value))
                setOpen(false)
              }}
            >
              {status.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  )
}
