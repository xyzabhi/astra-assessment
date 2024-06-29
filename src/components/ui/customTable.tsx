import { starShipsDataType } from "@/lib/types";
import { Button } from "./button";
import { Input } from "./input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";
import { keysEntityMap } from "@/lib/constants";

interface DataTableProps {
  data: Record<string, any>[]; // Dynamic data array
  isLoading: boolean;
}

const CustumTable: React.FC<DataTableProps> = ({ data, isLoading }) => {
  // console.log(keysEntityMap[tableType]);
  const tableHeaders = data[0] ? Object.keys(data[0]) : [];
  const renderTableHeader = () => {
    return (
      <TableHeader>
        <TableRow>
          {tableHeaders.map((header: any) => (
            <TableHead key={header}>{header}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
    );
  };

  const renderTableBody = () =>
    data.map((row) => (
      <TableRow
        key={12}
        onClick={() => {
          alert("Abhinav");
        }}
        className="hover:cursor-pointer"
      >
        {tableHeaders.map((key) => (
          <TableCell key={key}>{row[key]}</TableCell>
        ))}
      </TableRow>
    ));

  return isLoading ? (
    <div className="flex flex-row min-h-[500px] justify-center items-center">
      <div className="w-12 h-12 rounded-full animate-spin border-8 border-solid border-yellow-500 border-t-transparent"></div>
    </div>
  ) : (
    <>
      <Table className="border border-gray-300 rounded-md p-5">
        {renderTableHeader()}
        <TableBody>{renderTableBody()}</TableBody>
      </Table>
    </>
  );
};

export default CustumTable;
