import { Warehouse } from "@/services/warehouses/interfaces";

const TooltipContent = ({ id = "", name = "" }: Warehouse) => (
  <div className="flex flex-col">
    <p className="text-sm">{id}</p>
    <p className="text-sm">{name}</p>
  </div>
);

export { TooltipContent };
