import { ProductCategory } from "@/services/products/interfaces";

const TooltipContent = ({ id = "", name = "" }: ProductCategory) => (
  <div className="flex flex-col">
    <p className="text-sm">{id}</p>
    <p className="text-sm">{name}</p>
  </div>
);

export { TooltipContent };
