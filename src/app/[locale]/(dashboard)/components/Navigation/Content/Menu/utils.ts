import { EntityPermissions } from "@/services/interfaces";
import { MENU_OPTIONS } from "./constants";

const getMenuOptions = ({ entityPermissions }: { entityPermissions: EntityPermissions }) =>
  MENU_OPTIONS.filter(option => {
    if (!option?.entity) {
      return true;
    }

    return entityPermissions?.[option?.entity]?.hasAccess ?? false;
  });

export { getMenuOptions };
