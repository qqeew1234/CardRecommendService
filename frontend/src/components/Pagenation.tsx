interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageClick: (page: number) => void;
}

function Pagination({ currentPage, totalPages, onPageClick }: PaginationProps) {
  // 간단하게 모든 페이지 번호를 배열로 생성하여 보여줍니다.
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="pagination">
      {pages.map(
        (page) => (
          console.log("✔️현재페이지", currentPage),
          (
            <button
              key={page}
              onClick={() => onPageClick(page)}
              className={page === currentPage ? "active" : ""}
            >
              {page}
            </button>
          )
        )
      )}
    </div>
  );
}

export default Pagination;
