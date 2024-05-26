"use client";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Textarea } from "./ui/textarea";

interface TextInputProps {
  control: any;
  name: string;
  label: string;
  placeholder?: string;
  rows: number;
  desc?: string;
  className?: string;
  labelClass?: string;
  inputClass?: string;
}

const TextAreaInput = ({
  control,
  name,
  label,
  placeholder,
  rows,
  desc,
  className,
  labelClass,
  inputClass,
}: TextInputProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel className={cn("capitalize", labelClass)}>
            {label}
          </FormLabel>
          <FormControl>
            <Textarea
              className={inputClass}
              placeholder={placeholder}
              rows={rows}
              {...field}
            />
          </FormControl>
          {desc && <FormDescription>{desc}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default TextAreaInput;
