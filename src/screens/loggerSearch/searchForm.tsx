import { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import { InputField } from '../../components';
import { ActionTypeLoggerEnum } from '../../emums/actionTypeLogger.enum';
import { ApplicationTypeLoggerEnum } from '../../emums/applicationTypeLogger.enum';
import { compareDate } from '../../helper/compareDate';
import { IAuditLog } from '../../interfaces/ILoggerTable';

interface ISearchForm {
  applicationId: string;
  toDate: string;
  fromDate: string;
  applicationType: string;
  actionType: string;
  logId: string;
}
export const SearchForm = ({
  logger,
  isLoading,
  setFilteredlogger,
  navigateSearch,
  actionTypeList,
  applicationTypeList,
}: any) => {
  const [searchParams] = useSearchParams();
  const [formValue, setFormValue] = useState<ISearchForm>({
    applicationId: '',
    toDate: '',
    fromDate: '',
    applicationType: '',
    actionType: '',
    logId: '',
  });
  useEffect(() => {
    fillFormInputs();
  }, []);
  const handleField = (key: string, value: string) => {
    setFormValue({ ...formValue, [key]: value });
  };

  const fillFormInputs = () => {
    const obj: any = {};
    for (const entry of searchParams.entries()) {
      const [param, value] = entry;
      if (!!value) {
        obj[param] = value;
      }
    }
    setFormValue(obj);
  };

  const handleSubmit = (event: any) => {
    const newAuditLogList: IAuditLog[] = logger.auditLog.filter(
      (item: IAuditLog) => {
        const logIdCondition =
          item.logId.toString().includes(formValue.logId) || !formValue.logId;
        const actionTypeCondition =
          item.actionType.toString().includes(formValue.actionType) ||
          !formValue.actionType;
        const applicationTypeCondition =
          item.applicationType
            ?.toString()
            .includes(formValue.applicationType) || !formValue.applicationType;
        const applicationIdCondition =
          item.applicationId?.toString().includes(formValue.applicationId) ||
          !formValue.applicationId;

        const fromDateCondition = formValue.fromDate
          ? compareDate(formValue.fromDate, item.creationTimestamp)
          : true;
        const toDateCondition = formValue.toDate
          ? compareDate(item.creationTimestamp, formValue.toDate)
          : true;

        return (
          logIdCondition &&
          actionTypeCondition &&
          applicationTypeCondition &&
          applicationIdCondition &&
          fromDateCondition &&
          toDateCondition
        );
      }
    );
    navigateSearch('/', formValue);
    setFilteredlogger({ ...logger, auditLog: newAuditLogList });
    event.preventDefault();
  };
  const _actionTypeList = actionTypeList.map(
    (item: { value: string; text: string }) => {
      return {
        value: item,
        text: { ...ActionTypeLoggerEnum }[item.toString()],
      };
    }
  );
  const _applicationTypeList = applicationTypeList.map(
    (item: { value: string; text: string }) => {
      return {
        value: item,
        text: { ...ApplicationTypeLoggerEnum }[item.toString()],
      };
    }
  );
  return (
    <Container fluid>
      <Form onSubmit={handleSubmit}>
        <Row className="align-items-end py-3">
          <Col xs={10}>
            <Row>
              <Col xs={2}>
                <InputField
                  name="logId"
                  disabled={isLoading}
                  type="number"
                  value={formValue.logId}
                  label=" Log Id"
                  placeholder="e.g. 712087267864057"
                  onChange={handleField}
                />
              </Col>
              <Col xs={2}>
                <InputField
                  name="actionType"
                  disabled={isLoading}
                  type={'select'}
                  label="Action Type"
                  value={formValue.actionType}
                  list={_actionTypeList}
                  onChange={handleField}
                />
              </Col>
              <Col xs={2}>
                <InputField
                  name="applicationType"
                  disabled={isLoading}
                  type={'select'}
                  label="Application Type"
                  value={formValue.applicationType}
                  list={_applicationTypeList}
                  onChange={handleField}
                />
              </Col>
              <Col xs={2}>
                <InputField
                  name="fromDate"
                  disabled={isLoading}
                  type={'date'}
                  max={formValue.toDate}
                  value={formValue.fromDate}
                  label="From Date"
                  onChange={handleField}
                  placeholder="Select date"
                />
              </Col>
              <Col xs={2}>
                <InputField
                  name="toDate"
                  disabled={isLoading}
                  type={'date'}
                  label="To Date"
                  min={formValue.fromDate}
                  value={formValue.toDate}
                  onChange={handleField}
                  placeholder="Select date"
                />
              </Col>
              <Col xs={2}>
                <InputField
                  name="applicationId"
                  disabled={isLoading}
                  type={'number'}
                  label="Application Id"
                  value={formValue.applicationId}
                  onChange={handleField}
                  placeholder="e.g. 219841/2021"
                />
              </Col>
            </Row>
          </Col>
          <Col xs={2}>
            <Button
              className="w-100 mb-3"
              variant="primary"
              type="submit"
              disabled={isLoading}
            >
              Search Logger
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};
