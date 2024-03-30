import { Warehouse } from "@/services/warehouses/interfaces";

const TooltipContent = ({ id = "", name = "" }: Warehouse) => (
  <div className="flex flex-col">
    <p>{id}</p>
    <p>{name}</p>
  </div>
);

export { TooltipContent };
