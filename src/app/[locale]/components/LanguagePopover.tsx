"use client";

import { useLocale, useTranslations } from "next-intl";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import { usePathname } from "next/navigation";
import { MouseEvent, useState } from "react";
import Menu from "@mui/material/Menu";
import Image from "next/image";
import Link from "next/link";

import { LANGUAGES_DATA, LANGUAGE_CODES } from "@/constants";

const LanguagePopover = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const selectedLocale = useLocale();
  const isOpen = Boolean(anchorEl);
  const pathname = usePathname();
  const t = useTranslations();

  const selectedLocaleData =
    LANGUAGES_DATA[selectedLocale] ?? LANGUAGES_DATA[LANGUAGE_CODES.ENGLISH];

  const handleOpen = ({ currentTarget }: MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(currentTarget);

  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <IconButton onClick={handleOpen} className="w-12 h-12">
        <Image
          className="object-cover object-center rounded"
          src={selectedLocaleData.imgUrl}
          alt={selectedLocaleData.label}
          height={17}
          width={24}
        />
      </IconButton>

      <Menu
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={handleClose}
        anchorEl={anchorEl}
        open={isOpen}
      >
        {Object.values(LANGUAGES_DATA).map(({ label, value, imgUrl }) => (
          <MenuItem selected={value === selectedLocaleData.value} key={value} className="p-0">
            <Link
              className="flex flex-row items-center gap-3 no-underline text-black w-full px-3 py-2"
              href={`/${value}${pathname}`}
            >
              <Image
                className="object-cover object-center rounded"
                alt={t(label)}
                src={imgUrl}
                height={17}
                width={24}
              />

              {t(label)}
            </Link>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export { LanguagePopover };
