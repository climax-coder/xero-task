import React, { useState } from "react";
import { connectToXero, getTenants, fetchBalanceSheet } from "./api";
import BalanceSheetTable from "./components/BalanceSheetTable";

const App: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Function to connect to Xero and fetch balance sheet
  const handleConnect = async () => {
    setLoading(true);
    setError(null);

    try {
      await connectToXero();
      const tenants = await getTenants();
      const balanceSheet = await fetchBalanceSheet();

      setData({ tenants, balanceSheet });
    } catch (error) {
      setError("Error connecting to Xero or fetching data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-50 min-h-screen">
      <div className="text-3xl font-bold mb-4 text-gray-800">
        Xero Integration
      </div>
      <button
        onClick={handleConnect}
        className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 hover:bg-blue-700"
      >
        Connect to Xero
      </button>

      {loading && <p className="mt-4 text-gray-500">Loading...</p>}
      {error && <p className="mt-4 text-red-600">{error}</p>}

      {data && (
        <div className="mt-6 w-full max-w-2xl  p-4">
          <BalanceSheetTable report={data?.balanceSheet?.Reports[0]} />
        </div>
      )}
    </div>
  );
};

export default App;
