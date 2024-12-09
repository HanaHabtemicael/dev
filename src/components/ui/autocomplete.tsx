"use client";;
import { CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";
import { useState, useRef, useCallback, type KeyboardEvent } from "react";
import { Label } from "./label";

// import { Skeleton } from "./ui/skeleton"

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "./scroll-area";
import { Spinner } from "./spinner";
import { FormDescription, FormMessage } from "./form";
// import { cn } from "../utils/utils"

export type Option = Record<"value" | "label", string> & Record<string, string>;

type AutoCompleteProps = {
  options: Option[];
  emptyMessage: string;
  value?: Option;
  setValue?: (value: Option) => void;
  onValueChange?: (value: Option) => void;
  isLoading?: boolean;
  disabled?: boolean;
  label?: string;
  placeholder?: string;
  onSearch?: (search: string) => void;
  error?: string;
  description?: string;
};

export const AutoComplete = ({
  options,
  label,
  placeholder,
  emptyMessage,
  value,
  setValue,
  onValueChange,
  disabled,
  isLoading = false,
  onSearch,
  error,
  description,
}: AutoCompleteProps) => {
  if (
    options.filter((option) => option.value === value?.value).length == 0 &&
    value.value
  ) {
    options.splice(0, 0, value);
  }

  const inputRef = useRef<HTMLInputElement>(null);

  const [isOpen, setOpen] = useState(false);
  const [selected, setSelected] = useState<Option>(value as Option);
  const [inputValue, setInputValue] = useState<string>(value?.label || "");

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (!input) {
        return;
      }

      if (!isOpen) {
        setOpen(true);
      }

      if (event.key === "Enter" && input.value !== "") {
        const optionToSelect = options.find(
          (option) => option.label === input.value,
        );
        if (optionToSelect) {
          setSelected(optionToSelect);
          onValueChange?.(optionToSelect);
        }
      }

      if (event.key === "Escape") {
        input.blur();
      }
    },
    [isOpen, options, onValueChange],
  );

  const handleBlur = () => {
    setOpen(false);
    setInputValue(selected?.label);
  };

  const handleSelectOption = (selectedOption: Option) => {
    setInputValue(selectedOption.label);

    setSelected(selectedOption);
    onValueChange?.(selectedOption);

    setValue?.(selectedOption);

    setTimeout(() => {
      inputRef?.current?.blur();
    }, 0);
  };

  return (
    <div className="space-y-2">
      <Label className="">{label}</Label>
      <CommandPrimitive
        className="bg-transparent overflow-visible"
        onKeyDown={handleKeyDown}
      >
        <div>
          <CommandInput
            ref={inputRef}
            value={inputValue}
            onValueChange={(e) => {
              setInputValue(e);
              onSearch?.(e);
            }}
            onBlur={handleBlur}
            onFocus={() => setOpen(true)}
            placeholder={placeholder}
            disabled={disabled}
            className="border text-sm py-2.5"
          />
        </div>
        <div className="relative mt-1">
          <div
            className={cn(
              "animate-in fade-in-0 zoom-in-95 absolute top-0 z-10 w-full rounded-xl bg-white outline-none",
              isOpen ? "block" : "hidden",
            )}
          >
            <CommandList className="rounded-lg ring-1 ring-slate-200 overflow-hidden">
              <ScrollArea className="rounded-md border">
                {isLoading ? (
                  <CommandPrimitive.Loading>
                    <div className="p-1">
                      <Spinner />
                    </div>
                  </CommandPrimitive.Loading>
                ) : null}
                {options.length > 0 && !isLoading ? (
                  <CommandGroup>
                    {options.map((option) => {
                      const isSelected = selected?.value === option.value;
                      return (
                        <CommandItem
                          key={option.value}
                          value={option.label}
                          onMouseDown={(event) => {
                            event.preventDefault();
                            event.stopPropagation();
                          }}
                          onSelect={() => {
                            handleSelectOption(option);
                          }}
                          className={cn(
                            "flex w-full items-center gap-2",
                            !isSelected ? "pl-8" : null,
                          )}
                        >
                          {isSelected ? <Check className="w-4" /> : null}
                          {option.label}
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>
                ) : null}
                {!isLoading ? (
                  <CommandPrimitive.Empty className="select-none rounded-sm px-2 py-3 text-center text-sm">
                    {emptyMessage}
                  </CommandPrimitive.Empty>
                ) : null}
              </ScrollArea>
            </CommandList>
          </div>
        </div>
      </CommandPrimitive>
      <span className="text-sm">{description}</span>
      {error && <FormMessage>{error}</FormMessage>}
    </div>
  );
};
