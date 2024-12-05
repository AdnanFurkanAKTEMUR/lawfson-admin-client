import { GET_LOGS } from "@/app/_apolloConfig/graphqlResolvers/adminLogsResolver";
import { useQuery } from "@apollo/client";
import { Spin, Alert } from "antd";

export default function AdminLogsComp() {
  const { data: logsData, error: logsError, loading: logLoading } = useQuery(GET_LOGS);

  // Eğer yükleniyorsa yüklenme göstergesi göster.
  if (logLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Spin tip="Loading logs..." />
      </div>
    );
  }

  // Eğer bir hata varsa, hata mesajını göster.
  if (logsError) {
    return (
      <div className="m-4">
        <Alert
          message="Error"
          description={logsError.message}
          type="error"
          showIcon
        />
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Admin Logs</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="text-left px-4 py-2 border-r">Log ID</th>
              <th className="text-left px-4 py-2">Log Details</th>
            </tr>
          </thead>
          <tbody>
            {logsData?.getLogs?.map((log: string, index: number) => (
              <tr
                key={index}
                className="border-b hover:bg-gray-50"
              >
                <td className="px-4 py-2 border-r">{index + 1}</td>
                <td className="px-4 py-2">{log}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
