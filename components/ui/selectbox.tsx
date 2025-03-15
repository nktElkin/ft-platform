"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface SelectBoxProps {
  list: { label: string; value: string }[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  listTheme?: string;
}

export function SelectBox({
  list,
  value,
  onChange,
  defaultValue,
  listTheme = "",
}: SelectBoxProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between font-normal h-9 flex w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm md:text-sm"
        >
          {value
            ? list.find((listItem) => listItem.value === value)?.label
            : defaultValue
              ? defaultValue
              : `Select ${listTheme} item...`}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] lg:w-[400px] p-0">
        <Command>
          <CommandInput placeholder="Search listItem..." />
          <CommandList>
            <CommandEmpty>No {listTheme} items found.</CommandEmpty>
            <CommandGroup>
              {list.map((listItem) => (
                <CommandItem
                  key={listItem.value}
                  value={listItem.value}
                  onSelect={() => {
                    if (onChange) {
                      onChange(listItem.value === value ? "" : listItem.value);
                    }
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === listItem.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {listItem.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
