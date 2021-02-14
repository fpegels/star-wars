import { useState } from "react";
import { number, withKnobs } from "@storybook/addon-knobs";

import { Paginator } from ".";

const PaginatorStories = {
  title: "Design System/Paginator",
  component: Paginator,
  decorators: [withKnobs],
};

export default PaginatorStories;

export function Default() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <Paginator
      totalPages={number("Total Pages", 8)}
      currentPage={currentPage}
      onPageChange={setCurrentPage}
    />
  );
}
