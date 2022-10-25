//import liraries
import { useEffect, useState } from 'react';
import { Loader, Navbar, Alert } from '../../components';
import { uniqueArray } from '../../helper/uniqueArray';
import { useNavigateSearch } from '../../hooks/useNavigateSearch';
import { IAuditLog, ILoggerTable } from '../../interfaces/ILoggerTable';
import { getLogger } from '../../services/loggerService';
import { SearchForm } from './searchForm';
import { Table } from './table';

const navList = [
  { navTo: '/', title: 'home' },
  { navTo: '/', title: 'Administration' },
  { navTo: '/', title: 'Logger search' },
];
// create a component
export const LoggerSearchScreen = () => {
  const [logger, setLogger] = useState<ILoggerTable>({ auditLog: [] });
  const [isLoading, setLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);
  const [filteredlogger, setFilteredlogger] = useState<ILoggerTable>({
    auditLog: [],
  });
  const navigateSearch = useNavigateSearch();

  const [actionTypeList, setActionTypeList] = useState<string[]>([]);
  const [applicationTypeList, setApplicationTypeList] = useState<string[]>([]);

  useEffect(() => {
    const onLoadData = async () => {
      const loggerData: ILoggerTable = await getLogger().catch((e) => {
        setHasError(true);
        setLoading(false);
      });
      const auditLogList: IAuditLog[] = loggerData.auditLog;

      setActionTypeList(
        uniqueArray(
          auditLogList.map((itm) => itm.actionType).filter((itm) => !!itm)
        )
      );

      setApplicationTypeList(
        uniqueArray(
          auditLogList.map((itm) => itm.applicationType).filter((itm) => !!itm)
        )
      );
      setLogger(loggerData);
      setFilteredlogger(loggerData);
      setLoading(false);
    };
    onLoadData();
  }, []);

  return (
    <div>
      <Navbar navlist={navList} />
      <SearchForm
        logger={logger}
        isLoading={isLoading}
        setFilteredlogger={setFilteredlogger}
        navigateSearch={navigateSearch}
        actionTypeList={actionTypeList}
        applicationTypeList={applicationTypeList}
      />

      {hasError && (
        <Alert
          title="Something went error!"
          body="Change this and that and try again"
        />
      )}
      {!hasError && !isLoading && <Table {...filteredlogger} />}
      {isLoading && <Loader className="m-5" />}
    </div>
  );
};
