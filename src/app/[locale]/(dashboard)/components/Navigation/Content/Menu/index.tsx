"use server";

import { getTranslations } from "next-intl/server";

import { getUserSession } from "@/utils/auth";
import { MenuOption } from "./interfaces";
import { getMenuOptions } from "./utils";
import { Option } from "./Option";

const Menu = async () => {
  const t = await getTranslations("Navigation");
  const user = await getUserSession();

  const options = getMenuOptions({ entityPermissions: user?.entityPermissions ?? {} });

  return (
    <div className="flex flex-col gap-2">
      {options.map(({ label = "", ...rest }: MenuOption, index) => (
        <Option key={index} label={t(label)} {...rest} />
      ))}
    </div>
  );
};

export { Menu };
