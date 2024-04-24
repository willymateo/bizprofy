"use client";

import { useDispatch, useSelector } from "react-redux";
import Drawer from "@mui/material/Drawer";
import { ReactNode } from "react";

import { closeDrawer } from "@/redux/states/navigation";
import { Store } from "@/redux/types";

type Props = {
  DrawerContent: ReactNode;
  Content: ReactNode;
};

const Controller = ({ DrawerContent, Content }: Props) => {
  const isDrawerOpen = useSelector((state: Store) => state.navigation.isDrawerOpen);
  const dispatch = useDispatch();

  const handleCloseDrawer = () => dispatch(closeDrawer());

  return (
    <>
      <Drawer onClose={handleCloseDrawer} open={isDrawerOpen} onClick={handleCloseDrawer}>
        {DrawerContent}
      </Drawer>

      {Content}
    </>
  );
};

export { Controller };
