import { colors, mediaQuery, useScreenSize } from "../_theme";

import { Chevron } from "../_icons";
import { Fragment } from "react";
import styled from "@emotion/styled/macro";

type Props = {
  totalPages: number;
  currentPage: number;
  onPageChange: (pageNumber: number) => void;
};

export function Paginator({ totalPages, currentPage, onPageChange }: Props) {
  const { isDesktop } = useScreenSize();
  const maxPages = isDesktop ? 11 : 5;
  let startPage = 1;
  let endPage = totalPages;

  const handleNextPage = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  if (totalPages > maxPages) {
    const maxPagesBeforeCurrentPage = Math.floor(maxPages / 2);
    const maxPagesAfterCurrentPage = Math.ceil(maxPages / 2) - 1;

    if (currentPage <= maxPagesBeforeCurrentPage) {
      endPage = maxPages;
    } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
      startPage = totalPages - maxPages + 1;
      endPage = totalPages;
    } else {
      startPage = currentPage - maxPagesBeforeCurrentPage;
      endPage = currentPage + maxPagesAfterCurrentPage;
    }
  }

  const shownPages = Array.from(Array(endPage + 1 - startPage).keys()).map(
    (i) => startPage + i
  );

  return totalPages > 1 ? (
    <Container data-testid="paginator">
      {shownPages.length > 1 && (
        <PreviousButton
          data-testid="previous-button"
          disabled={currentPage === 1}
          onClick={handlePreviousPage}
        >
          <Chevron />
        </PreviousButton>
      )}
      {shownPages.map((page) => (
        <PageButton
          data-testid={`page-${page}-button`}
          key={page}
          selected={page === currentPage}
          onClick={() => onPageChange(page)}
        >
          {page}
        </PageButton>
      ))}
      {shownPages.length > 1 && (
        <NextButton
          data-testid="next-button"
          disabled={currentPage === totalPages}
          onClick={handleNextPage}
        >
          <Chevron />
        </NextButton>
      )}
    </Container>
  ) : (
    <Fragment />
  );
}

const Container = styled.div({
  display: "grid",
  gridAutoFlow: "column",
  gridAutoColumns: "max-content",
  gridGap: "2rem",

  [mediaQuery.desktop]: {
    gridGap: "0.8rem",
  },
});

type PreviousButtonProps = {
  disabled: boolean;
};

const PreviousButton = styled.button<PreviousButtonProps>((props) => ({
  border: "none",
  outline: "none",
  backgroundColor: "transparent",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: props.disabled ? "default" : "pointer",

  "& svg": {
    color: props.disabled ? colors.greyMain : colors.greyMedium,
    transform: "rotate(90deg)",
    fontSize: "0.8rem",
  },
}));

type PageButtonProps = {
  selected: boolean;
};

const PageButton = styled.button<PageButtonProps>((props) => {
  const selectedColor = colors.black;
  return {
    width: "2.4rem",
    height: "2.4rem",
    border: "none",
    borderRadius: "50%",
    backgroundColor: props.selected ? selectedColor : "transparent",
    outline: "none",
    fontSize: "1.4rem",
    color: props.selected ? colors.white : colors.greyMedium,
    cursor: props.selected ? "default" : "pointer",
    padding: 0,

    "&:hover": {
      backgroundColor: selectedColor,
      opacity: props.selected ? "100%" : "60%",
    },
  };
});

type NextButtonProps = {
  disabled: boolean;
};

const NextButton = styled.button<NextButtonProps>((props) => ({
  border: "none",
  outline: "none",
  backgroundColor: "transparent",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: props.disabled ? "default" : "pointer",

  "& svg": {
    color: props.disabled ? colors.greyMain : colors.greyMedium,
    transform: "rotate(-90deg)",
    fontSize: "0.8rem",
  },
}));
