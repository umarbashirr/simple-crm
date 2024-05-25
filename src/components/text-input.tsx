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

interface TextInputProps {
  control: any;
  name: string;
  label: string;
  placeholder?: string;
  type: string;
  desc?: string;
  className?: string;
  labelClass?: string;
}

const TextInput = ({
  control,
  name,
  label,
  placeholder,
  type,
  desc,
  className,
  labelClass,
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
            <Input placeholder={placeholder} type={type} {...field} />
          </FormControl>
          {desc && <FormDescription>{desc}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default TextInput;
