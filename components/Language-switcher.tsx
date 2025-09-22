"use client";

import * as React from "react";
import { useTranslation } from 'react-i18next';
import { Check, Globe } from "lucide-react"; // Import the Check icon
import { cn } from "@/lib/utils"; // Import cn for conditional classes

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function LanguageSwitcher() {
  const { i18n, t } = useTranslation('common');

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  // An array to hold language options for easier mapping
  const languages = [
    { code: 'en', label: t('en') },
    { code: 'es', label: t('es') },
    { code: 'fr', label: t('fr') },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="cursor-pointer" variant="ghost" size="icon" aria-label="Change language">
          <Globe className="h-5 w-5 text-charcoal/80 group-hover:text-charcoal" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            className="cursor-pointer"
          >
            {/* Flex container to align text and checkmark */}
            <div className="flex items-center justify-between w-full">
              <span>{lang.label}</span>
              {/* Conditionally render the checkmark if this is the active language */}
              {i18n.language === lang.code && <Check className="h-4 w-4 ml-2" />}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}