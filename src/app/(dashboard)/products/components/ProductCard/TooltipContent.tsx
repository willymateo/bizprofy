import { Product } from "@/services/products/interfaces";

const TooltipContent = ({ id = "", name = "", description = "" }: Product) => (
  <div className="flex flex-col">
    <p>{id}</p>
    <p>{name}</p>
    <p>{description}</p>
  </div>
);

export { TooltipContent };
