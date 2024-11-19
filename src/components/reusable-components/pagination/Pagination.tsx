import React from 'react';
type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};
const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex items-center justify-between sm:space-x-4 pt-[16px] md:pt-[32px]">
      {/* Prev Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="md:px-[16px] w-[85px] sm:w-[100px] md:py-[12px] font-bold md:text-base text-[white] rounded-[8px] bg-[#424242] px-[14px] py-[10px] text-[14px]  "
      >
      <p className='mt-[3px]'> Previous</p>
      </button>
      {/* Page Info */}
      <span className="text-[#D9D9D9] font-normal text-sm">
        Page {currentPage} of {totalPages}
      </span>
      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-[14px] w-[85px] sm:w-[100px] py-[10px] md::px-[16px] md:py-[12px] font-bold md:text-base text-[black] rounded-[8px] bg-[white] text-[14px] "
      >
       <p className='mt-[3px]'> Next</p>
      </button>
    </div>
  );
};
export default Pagination;