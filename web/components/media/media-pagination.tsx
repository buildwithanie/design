import { Fragment } from "react";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { getMediaHref, type MediaView } from "./media-navigation";

type MediaPaginationProps = {
  currentPage: number;
  totalPages: number;
  view: MediaView;
};

function getVisiblePages(currentPage: number, totalPages: number) {
  const visible = new Set([1, totalPages]);

  for (let page = currentPage - 1; page <= currentPage + 1; page += 1) {
    if (page > 1 && page < totalPages) {
      visible.add(page);
    }
  }

  return [...visible].sort((a, b) => a - b);
}

export function MediaPagination({
  currentPage,
  totalPages,
  view,
}: MediaPaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const visiblePages = getVisiblePages(currentPage, totalPages);

  return (
    <div className="mx-auto w-[min(1180px,92vw)] pb-10 sm:pb-14">
      <Pagination>
        <PaginationContent>
          {currentPage > 1 ? (
            <PaginationItem>
              <PaginationPrevious
                href={getMediaHref(view, currentPage - 1)}
              />
            </PaginationItem>
          ) : null}

          {visiblePages.map((page, index) => {
            const previousPage = visiblePages[index - 1];
            const hasGap = previousPage !== undefined && page - previousPage > 1;

            return (
              <Fragment key={page}>
                {hasGap ? (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                ) : null}

                <PaginationItem>
                  <PaginationLink
                    href={getMediaHref(view, page)}
                    isActive={page === currentPage}
                    aria-label={`Go to page ${page}`}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              </Fragment>
            );
          })}

          {currentPage < totalPages ? (
            <PaginationItem>
              <PaginationNext href={getMediaHref(view, currentPage + 1)} />
            </PaginationItem>
          ) : null}
        </PaginationContent>
      </Pagination>
    </div>
  );
}
