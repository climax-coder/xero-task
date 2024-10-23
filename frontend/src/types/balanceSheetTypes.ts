export type Cell = {
  Value: string | number;
  Attributes?: { Value: string; Id: string }[];
};

export type Row = {
  RowType: string;
  Title?: string;
  Cells?: Cell[];
  Rows?: Row[];
};

export type Report = {
  ReportID: string;
  ReportName: string;
  ReportTitles: string[];
  Rows: Row[];
};

export interface BalanceSheetTableProps {
  report: Report;
}
