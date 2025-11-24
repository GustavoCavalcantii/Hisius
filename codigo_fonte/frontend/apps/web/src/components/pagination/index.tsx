import { Container, PageButton } from "./styles";

interface PaginationProps {
  totalItems: number;
  itemsPerPage?: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
  maxVisibleButtons?: number;
}

export default function Pagination({
  totalItems,
  itemsPerPage = 10,
  currentPage = 1,
  onPageChange,
  maxVisibleButtons = 5,
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const changePage = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages || newPage === currentPage) {
      return;
    }
    onPageChange(newPage);
  };

  const generatePageNumbers = (): (number | string)[] => {
    if (totalPages <= 1) return [];

    const numbers: (number | string)[] = [];
    const half = Math.floor(maxVisibleButtons / 2);

    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, start + maxVisibleButtons - 1);

    if (end - start + 1 < maxVisibleButtons) {
      start = Math.max(1, end - maxVisibleButtons + 1);
    }

    if (start > 1) {
      numbers.push(1);
      if (start > 2) numbers.push("...");
    }

    for (let i = start; i <= end; i++) {
      numbers.push(i);
    }

    if (end < totalPages) {
      if (end < totalPages - 1) numbers.push("...");
      numbers.push(totalPages);
    }

    return numbers;
  };

  if (totalPages <= 1) return null;

  const pageNumbers = generatePageNumbers();

  return (
    <Container>
      {/* Botão anterior */}
      <PageButton
        onClick={() => changePage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        ‹
      </PageButton>

      {/* Números das páginas */}
      {pageNumbers.map((number, index) => (
        <PageButton
          key={index}
          $active={number === currentPage}
          $dots={number === "..."}
          onClick={() => typeof number === "number" && changePage(number)}
          disabled={number === "..."}
        >
          {number}
        </PageButton>
      ))}

      {/* Botão próximo */}
      <PageButton
        onClick={() => changePage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        ›
      </PageButton>
    </Container>
  );
}
