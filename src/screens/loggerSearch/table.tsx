//import liraries
import React, { useEffect, useMemo, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { ActionTypeLoggerEnum } from '../../emums/actionTypeLogger.enum';
import { ApplicationTypeLoggerEnum } from '../../emums/applicationTypeLogger.enum';
import { formatDateTime } from '../../helper/formatDateTime';
import { IAuditLog, ILoggerTable } from '../../interfaces/ILoggerTable';
import { Pagination } from '../../components/pagination';
import { BsArrowUpShort, BsArrowDownShort } from 'react-icons/bs';

const PageSize = 10;

const TableHeader = ({
  onSort,
  sortBased,
}: {
  onSort: (str: string) => void;
  sortBased: string;
}) => {
  return (
    <Row className="border-bottom p-3 fw-bold">
      <Col xs={8}>
        <Row>
          <Col xs={2}>
            <span>Log ID</span>
            <button className="btn p-0 mx-1" onClick={() => onSort('logId')}>
              {sortBased !== 'logId' && (
                <BsArrowUpShort className="rounded-circle bg-eggBlue" />
              )}
              {sortBased === 'logId' && (
                <BsArrowDownShort className="rounded-circle bg-eggBlue" />
              )}
            </button>
          </Col>
          <Col xs={3}>
            <span>Application Type</span>
            <button
              className="btn p-0 mx-1"
              onClick={() => onSort('applicationType')}
            >
              {sortBased !== 'applicationType' && (
                <BsArrowUpShort className="rounded-circle bg-eggBlue" />
              )}
              {sortBased === 'applicationType' && (
                <BsArrowDownShort className="rounded-circle bg-eggBlue" />
              )}
            </button>
          </Col>
          <Col xs={2}>
            <span>Application ID</span>
            <button
              className="btn p-0 mx-1"
              onClick={() => onSort('applicationId')}
            >
              {sortBased !== 'applicationId' && (
                <BsArrowUpShort className="rounded-circle bg-eggBlue" />
              )}
              {sortBased === 'applicationId' && (
                <BsArrowDownShort className="rounded-circle bg-eggBlue" />
              )}
            </button>
          </Col>
          <Col xs={2}>
            <span>Action</span>
            <button
              className="btn p-0 mx-1"
              onClick={() => onSort('actionType')}
            >
              {sortBased !== 'actionType' && (
                <BsArrowUpShort className="rounded-circle bg-eggBlue" />
              )}
              {sortBased === 'actionType' && (
                <BsArrowDownShort className="rounded-circle bg-eggBlue" />
              )}
            </button>
          </Col>
          <Col xs={2}>
            <span>Action Details</span>
            <button
              className="btn p-0 mx-1"
              onClick={() => onSort('actionDetails')}
            >
              {sortBased !== 'actionDetails' && (
                <BsArrowUpShort className="rounded-circle bg-eggBlue" />
              )}
              {sortBased === 'actionDetails' && (
                <BsArrowDownShort className="rounded-circle bg-eggBlue" />
              )}
            </button>
          </Col>
        </Row>
      </Col>
      <Col xs={4}>
        <span>Date:Time</span>
        <button
          className="btn p-0 mx-1"
          onClick={() => onSort('creationTimestamp')}
        >
          {sortBased !== 'creationTimestamp' && (
            <BsArrowUpShort className="rounded-circle bg-eggBlue" />
          )}
          {sortBased === 'creationTimestamp' && (
            <BsArrowDownShort className="rounded-circle bg-eggBlue" />
          )}
        </button>
      </Col>
    </Row>
  );
};
const TableRecord = ({ item }: { item: IAuditLog }) => {
  return (
    <Row className="border-bottom p-3">
      <Col xs={8}>
        <Row>
          <Col xs={2}>{item.logId}</Col>
          <Col xs={3}>
            {{ ...ApplicationTypeLoggerEnum }[item.applicationType]}
          </Col>
          <Col xs={2}>
            {!item.applicationId && <span className="opacity-25">-/-</span>}
            {item.applicationId}
          </Col>
          <Col xs={2}>{{ ...ActionTypeLoggerEnum }[item.actionType]} </Col>
          <Col xs={2}>
            {!item.actionDetails && <span className="opacity-25">-/-</span>}
            {item.actionDetails}
          </Col>
        </Row>
      </Col>
      <Col xs={4}>{formatDateTime(item.creationTimestamp)}</Col>
    </Row>
  );
};

// create a component
export const Table = ({ auditLog }: ILoggerTable) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBased, setSortBased] = useState<string>('');

  const handleSort = (field: string): void => {
    if (sortBased === field) {
      setSortBased('');
    } else {
      setSortBased(field);
    }

    setCurrentPage(1);
  };
  const sortAlphabetically = (ascending: boolean, key: string) => {
    return (a: any, b: any) => {
      if (key === 'creationTimestamp') {
        return Date.parse(a[key]) < Date.parse(b[key]) ? -1 : 1;
      }
      if (a[key] === b[key]) {
        return 0;
      } else if (a[key] === null) {
        return 1;
      } else if (b[key] === null) {
        return -1;
      } else if (ascending) {
        return a[key] < b[key] ? -1 : 1;
      }
      // if descending, highest sorts first
      else {
        return a[key] < b[key] ? 1 : -1;
      }
    };
  };

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;

    if (!!sortBased) {
      return [...auditLog]
        .sort(sortAlphabetically(true, sortBased))
        .slice(firstPageIndex, lastPageIndex);
    }

    return auditLog.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, auditLog, sortBased]);

  useEffect(() => {
    setCurrentPage(1);
  }, [auditLog]);

  return (
    <>
      <Container className="shadow-sm bg-white" fluid>
        <TableHeader onSort={handleSort} sortBased={sortBased} />
        {currentTableData.map((item: IAuditLog, index: number) => (
          <React.Fragment key={index}>
            <TableRecord item={item} />
          </React.Fragment>
        ))}
        {!currentTableData.length && (
          <h4 className="p-5 text-center">no Data</h4>
        )}

        <Pagination
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={auditLog.length}
          pageSize={PageSize}
          onPageChange={(page: any) => setCurrentPage(page)}
        />
      </Container>
    </>
  );
};
