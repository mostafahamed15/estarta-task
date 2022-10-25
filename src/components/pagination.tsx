import React from 'react';
import classnames from 'classnames';
import { usePagination, DOTS } from '../hooks/usePagination';
import './../style/pagination.scss';
export const Pagination = (props: any) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className,
  } = props;

  const paginationRange: any = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul
      className={classnames('pagination-container', { [className]: className })}
    >
      {currentPage !== 1 && (
        <li className={classnames('pagination-item')} onClick={onPrevious}>
          <div className="arrow left" />
        </li>
      )}
      {paginationRange.map((pageNumber: any, i: number) => {
        if (pageNumber === DOTS) {
          return (
            <React.Fragment key={i}>
              <li className="pagination-item dots">&#8230;</li>
            </React.Fragment>
          );
        }

        return (
          <React.Fragment key={i}>
            <li
              className={classnames('pagination-item', {
                selected: pageNumber === currentPage,
              })}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </li>
          </React.Fragment>
        );
      })}
      {currentPage !== lastPage && (
        <React.Fragment key={'arrow right'}>
          <li className={classnames('pagination-item')} onClick={onNext}>
            <div className="arrow right" />
          </li>{' '}
        </React.Fragment>
      )}
    </ul>
  );
};
