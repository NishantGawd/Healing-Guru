"use client";

import * as React from "react";
import { Globe } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function LanguageSwitcher() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {/* The button styling is designed to match your existing header buttons */}
        <Button variant="ghost" size="icon" aria-label="Change language">
          <Globe className="h-5 w-5 text-charcoal/80 group-hover:text-charcoal" />
        </Button>
      </DropdownMenuTrigger>
      {/* The content styling uses your site's default card/popover styles */}
      <DropdownMenuContent align="end">
        <DropdownMenuItem className="cursor-pointer">
          English
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          Español (Spanish)
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          Français (French)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

