"use client";

import { useState } from "react";

import { Stock } from "../interfaces";

interface Props {
  stock: Stock[];
}

const SimpleTable = ({ stock }: Props) => {
  const [tableProperties, setTableProperties] = useState({
    currentPageNumber: 1,
    pageSize: 10,
    totalPages: 10,
  });

  console.log({
    stock,
  });

  return <div>Simple Table</div>;
};

export { SimpleTable };
