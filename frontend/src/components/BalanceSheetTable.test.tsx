import React from "react";
import { render, screen } from "@testing-library/react";
import BalanceSheetTable from "./BalanceSheetTable";
import { Report } from "../types/balanceSheetTypes";

const mockReport: Report = {
  ReportID: "12345",
  ReportName: "Balance Sheet Report",
  ReportTitles: ["Balance Sheet", "As of October 2024"],
  Rows: [
    {
      RowType: "Header",
      Cells: [
        {
          Value: ""
        },
        {
          Value: "31 Oct 2024"
        },
        {
          Value: "31 Oct 2023"
        }
      ]
    },
    {
      RowType: "Section",
      Title: "Assets",
      Rows: [
        {
          RowType: "Row",
          Cells: [
            { Value: "Checking Account", Attributes: [] },
            { Value: "-5092.83", Attributes: [] },
            { Value: "4798.98", Attributes: [] }
          ]
        },
        {
          RowType: "SummaryRow",
          Cells: [
            { Value: "Total Cash and Cash Equivalents" },
            { Value: "-5092.83" },
            { Value: "4798.98" }
          ]
        }
      ]
    },
    {
      RowType: "Section",
      Title: "Liabilities",
      Rows: [
        {
          RowType: "Row",
          Cells: [{ Value: "Accounts Payable" }, { Value: "$5,000" }]
        }
      ]
    },
    {
      RowType: "SummaryRow",
      Cells: [{ Value: "Total Liabilities" }, { Value: "$5,000" }]
    }
  ]
};

describe("BalanceSheetTable", () => {
  beforeEach(() => {
    render(<BalanceSheetTable report={mockReport} />);
  });

  test("renders report titles", () => {
    expect(screen.getByText("Balance Sheet")).toBeInTheDocument();
    expect(screen.getByText("As of October 2024")).toBeInTheDocument();
  });

  test("renders header row", () => {
    expect(screen.getByText("31 Oct 2024")).toBeInTheDocument();
    expect(screen.getByText("31 Oct 2023")).toBeInTheDocument();
  });

  test("renders section titles and row data", () => {
    expect(screen.getByText("Assets")).toBeInTheDocument();
    expect(screen.getByText("Checking Account")).toBeInTheDocument();
    const amounts = screen.getAllByText("-5092.83");
    expect(amounts).toHaveLength(2);
    expect(amounts[0]).toBeInTheDocument(); 
    const amountsTwo = screen.getAllByText("4798.98");
    expect(amountsTwo).toHaveLength(2);
    expect(amountsTwo[0]).toBeInTheDocument(); 

    expect(screen.getByText("Liabilities")).toBeInTheDocument();
    expect(screen.getByText("Accounts Payable")).toBeInTheDocument();
  });

  test("applies font-bold to summary rows", () => {
    const summaryRow = screen.getByText("Total Liabilities").closest("tr");
    expect(summaryRow).toHaveClass("font-bold");
  });
});
