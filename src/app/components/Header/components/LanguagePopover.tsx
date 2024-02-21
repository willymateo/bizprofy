"use client";

import { useDispatch, useSelector } from "react-redux";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import { MouseEvent, useState } from "react";
import Popover from "@mui/material/Popover";
import Image from "next/image";

import { LANGUAGES_DATA, LANGUAGE_CODES } from "@/shared/constants";
import { setLanguage } from "@/redux/states/language";
import { Store } from "@/redux/interfaces";

const LanguagePopover = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const selectedLanguage = useSelector((state: Store) => state.language);
  const isOpen = Boolean(anchorEl);
  const dispatch = useDispatch();
  const id = isOpen ? "language-popover" : undefined;

  const handleChangeLanguage = ({ languageCode = LANGUAGE_CODES.ENGLISH }) => {
    dispatch(setLanguage(languageCode));
    handleClose();
  };

  const handleOpen = ({ currentTarget }: MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(currentTarget);

  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <IconButton
        aria-describedby={id}
        onClick={handleOpen}
        sx={{
          width: 40,
          height: 40,
          ...(isOpen && {
            bgcolor: "action.selected",
          }),
        }}>
        <Image
          className="object-cover object-center rounded"
          src={selectedLanguage.imgUrl}
          alt={selectedLanguage.label}
          height={17}
          width={24}
        />
      </IconButton>

      <Popover
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={handleClose}
        anchorEl={anchorEl}
        slotProps={{
          paper: {
            sx: {
              width: 180,
              ml: 0.75,
              mt: 1,
              p: 0,
            },
          },
        }}
        open={isOpen}
        id={id}>
        {Object.values(LANGUAGES_DATA).map(({ label, value }) => (
          <MenuItem
            onClick={() => handleChangeLanguage({ languageCode: value })}
            selected={value === selectedLanguage.value}
            sx={{ typography: "body2", py: 1 }}
            className="flex flex-row gap-3"
            key={value}>
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
      </Popover>
    </>
  );
};

export { LanguagePopover };
