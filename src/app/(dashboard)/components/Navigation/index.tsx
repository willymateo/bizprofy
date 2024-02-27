"use client";

import { useDispatch, useSelector } from "react-redux";
import Drawer from "@mui/material/Drawer";

import { closeDrawer } from "@/redux/states/navigation";
import { Store } from "@/redux/interfaces";
import { Content } from "./Content";

const Navigation = () => {
  const isDrawerOpen = useSelector((state: Store) => state.navigation.isDrawerOpen);
  const dispatch = useDispatch();

  const handleCloseDrawer = () => dispatch(closeDrawer());

  return (
    <>
      <Drawer onClose={handleCloseDrawer} open={isDrawerOpen} onClick={handleCloseDrawer}>
        <Content />
      </Drawer>

      <Content className="hidden xl:flex" />
    </>
  );
};

export { Navigation };
