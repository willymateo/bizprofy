import { ProductCategory } from "@/services/products/categories/types";

const TooltipContent = ({ id = "", name = "" }: ProductCategory) => (
  <div className="flex flex-col">
    <p>{id}</p>
    <p>{name}</p>
  </div>
);

export { TooltipContent };
