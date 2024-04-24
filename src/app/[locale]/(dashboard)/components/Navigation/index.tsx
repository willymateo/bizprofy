"use server";

import { Controller } from "./Controller";
import { Content } from "./Content";

const Navigation = () => (
  <Controller Content={<Content className="hidden xl:flex" />} DrawerContent={<Content />} />
);

export { Navigation };
