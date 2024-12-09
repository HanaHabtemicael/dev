// src/components/PaginationComponent.tsx

import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

const { floor, min, max } = Math;
const range = (lo: number, hi: number) => Array.from({ length: hi - lo }, (_, i) => i + lo);

const pagination = (count: number, ellipsis = "…") => (page: number, total: number) => {
  const start = max(1, min(page - floor((count - 3) / 2), total - count + 2));
  const end = min(total, max(page + floor((count - 2) / 2), count - 1));
  return [
    ...(start > 2 ? [1, ellipsis] : start > 1 ? [1] : []),
    ...range(start, end + 1),
    ...(end < total - 1 ? [ellipsis, total] : end < total ? [total] : []),
  ];
};

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  count?: number;
}

export const PaginationComponent = ({ currentPage, totalPages, setPage, count = 7 }: PaginationProps) => {
  const paginationItems = pagination(count)(currentPage, totalPages);

  return (
    <Pagination className="w-min">
      <PaginationContent>
        <PaginationItem
          className={cn("cursor-pointer", {
            "opacity-50 cursor-not-allowed": currentPage <= 1,
          })}
          onClick={(e) => {
            e.preventDefault();
            if (currentPage > 1) setPage(currentPage - 1);
          }}
        >
          <PaginationPrevious href="#" />
        </PaginationItem>

        {paginationItems.map((page, index) => (
          <PaginationItem key={index}>
            {page === "…" ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                href="#"
                isActive={page === currentPage}
                className={cn({
                  "text-white bg-primary": page === currentPage,
                })}
                onClick={() => setPage(page)}
              >
                {page}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        <PaginationItem
          className={cn("cursor-pointer", {
            "opacity-50 cursor-not-allowed": currentPage >= totalPages,
          })}
          onClick={(e) => {
            e.preventDefault();
            if (currentPage < totalPages) setPage(currentPage + 1);
          }}
        >
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
