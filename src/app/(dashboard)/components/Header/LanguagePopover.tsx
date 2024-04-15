"use client";

import { useDispatch, useSelector } from "react-redux";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import { MouseEvent, useState } from "react";
import Menu from "@mui/material/Menu";
import Image from "next/image";

import { LANGUAGES_DATA, LANGUAGE_CODES } from "@/shared/constants";
import { setLanguage } from "@/redux/states/language";
import { Store } from "@/redux/types";

const LanguagePopover = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const selectedLanguage = useSelector((state: Store) => state.language);
  const isOpen = Boolean(anchorEl);
  const dispatch = useDispatch();

  const handleChangeLanguage = ({ languageCode = LANGUAGE_CODES.ENGLISH }) => {
    dispatch(setLanguage(languageCode));
    handleClose();
  };

  const handleOpen = ({ currentTarget }: MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(currentTarget);

  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <IconButton onClick={handleOpen} className="w-12 h-12">
        <Image
          className="object-cover object-center rounded"
          src={selectedLanguage.imgUrl}
          alt={selectedLanguage.label}
          height={17}
          width={24}
        />
      </IconButton>

      <Menu
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        id="language-popover"
        onClose={handleClose}
        anchorEl={anchorEl}
        open={isOpen}
      >
        {Object.values(LANGUAGES_DATA).map(({ label, value }) => (
          <MenuItem
            onClick={() => handleChangeLanguage({ languageCode: value })}
            selected={value === selectedLanguage.value}
            sx={{ typography: "body2", py: 1 }}
            className="flex flex-row gap-3"
            key={value}
          >
            <Image
              className="object-cover object-center rounded"
              src={LANGUAGES_DATA[value].imgUrl}
              alt={label}
              height={17}
              width={24}
            />

            {label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export { LanguagePopover };
