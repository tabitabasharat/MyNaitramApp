import React from 'react';
type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};
const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex items-center justify-between space-x-4 pt-[16px] md:pt-[32px]">
      {/* Prev Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-[16px] py-[12px] font-bold text-base text-[white] rounded-[8px] bg-[#424242] "
      >
        Previous
      </button>
      {/* Page Info */}
      <span className="text-[#D9D9D9] font-normal text-sm">
        Page {currentPage} of {totalPages}
      </span>
      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-[16px] py-[12px] font-bold text-base text-[black] rounded-[8px] bg-[white] "
      >
        Next
      </button>
    </div>
  );
};
export default Pagination;