import React from "react";
import { BalanceSheetTableProps, Row as RowType } from "../types/balanceSheetTypes";

const RenderRow: React.FC<{ row: RowType; depth: number }> = ({ row, depth }) => {
  const isSection = row.RowType === "Section";
  const isSummary = row.RowType === "SummaryRow";  
  const bgColor = depth === 0 ? "bg-blue-200" : depth === 1 ? "bg-blue-100" : "bg-gray-50";
  const fontClass = isSummary ? "font-bold" : "";

  return (
    <>
      {isSection && row.Title && (
        <tr>
          <td
            colSpan={row?.Cells?.length || 3}
            className={`text-left px-4 py-2 font-bold ${bgColor}`}
          >
            {row.Title}
          </td>
        </tr>
      )}
      {!isSection && (
        <tr className={`${bgColor} ${fontClass}`}>
          {row.Cells?.map((cell, index) => (
            <td key={index} className="border border-gray-300 px-4 py-2 text-center">
              {cell.Value || "-"}
            </td>
          ))}
        </tr>
      )}

      {row.Rows?.map((subRow, index) => (
        <RenderRow key={index} row={subRow} depth={depth + 1} />
      ))}
    </>
  );
};

const BalanceSheetTable: React.FC<BalanceSheetTableProps> = ({ report }) => {
  const { ReportTitles, Rows } = report;
  const headerRow = Rows.find((row) => row.RowType === "Header");

  return (
    <div className="flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-2xl">
        <div className="mb-6 text-center">
          {ReportTitles.map((title, index) => (
            <h2
              key={index}
              className="text-xl font-bold text-gray-800 mb-2 first:mt-0"
            >
              {title}
            </h2>
          ))}
        </div>

        <table className="w-full border border-gray-300 rounded-lg overflow-hidden shadow-lg bg-white">
          <tbody>
            {headerRow && (
              <tr className="bg-gray-100">
                {headerRow.Cells?.map((cell, index) => (
                  <td
                    key={index}
                    className="border border-gray-300 px-4 py-2 text-center font-semibold"
                  >
                    {cell.Value || "BalanceSheet"}
                  </td>
                ))}
              </tr>
            )}

            {Rows.filter((row) => row.RowType !== "Header").map((row, index) => (
              <RenderRow key={index} row={row} depth={0} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BalanceSheetTable;
