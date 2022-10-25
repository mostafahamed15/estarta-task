export interface IAuditLog {
  logId: string;
  applicationId: string;
  applicationType: string;
  companyId: string;
  actionType: string;
  ip: string;
  userAgent: string;
  userId: string;
  source: string;
  ownerId: string;
  actionDetails?: string;
  creationTimestamp: string;
}

export interface ILoggerTable {
  recordsFiltered?: number;
  totalPages?: number;
  number?: number;
  recordsTotal?: number;
  auditLog: IAuditLog[];
}
