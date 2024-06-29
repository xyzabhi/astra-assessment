/* eslint-disable react/jsx-key */
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
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./sheet";

interface DataTableProps {
  data: Record<string, any>[]; // Dynamic data array
  isAsc: number;
  handleSortOrder: any;
  filmList: string[];
}
const SHEET_SIDES = ["top", "right", "bottom", "left"] as const;

const CustumTable: React.FC<DataTableProps> = ({
  data,
  isAsc,
  handleSortOrder,
  filmList,
}) => {
  const tableHeaders = data[0] ? Object.keys(data[0]) : [];
  const renderTableHeader = () => {
    return (
      <TableHeader>
        <TableRow className="hover:bg-black">
          {tableHeaders.map((header: any) => (
            <TableHead key={header} className="text-yellow-500">
              {header}{" "}
              <span
                className="text-yellow-500 cursor-pointer"
                onClick={handleSortOrder}
              >
                {header === "Name" ? (isAsc ? "▲" : "▼") : ""}
              </span>
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
    );
  };

  const renderTableBody = () =>
    data.map((row) => (
      <Sheet key={"side"}>
        <SheetTrigger asChild>
          <TableRow
            key={12}
            className="hover:cursor-pointer hover:bg-yellow-500 hover:text-white"
          >
            {tableHeaders.map((key) => (
              <TableCell key={key}>{row[key]}</TableCell>
            ))}
          </TableRow>
        </SheetTrigger>
        <SheetContent side={"bottom"} className="bg-black text-yellow-500">
          <SheetHeader>
            <SheetTitle className="bg-yellow-500 text-white w-[200px] text-center">
              {row.Name}
            </SheetTitle>
            <SheetDescription>
              {
                // eslint-disable-next-line react/jsx-key
                filmList.map((item: any) => (
                  <p className="text-yellow-500">{item}</p>
                ))
              }
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4"></div>
          </div>
        </SheetContent>
      </Sheet>
    ));

  return data.length > 0 ? (
    <Table className="border border-gray-300 rounded-md p-5 bg-black text-yellow-500">
      {renderTableHeader()}
      <TableBody>{renderTableBody()}</TableBody>
    </Table>
  ) : (
    <p className="text-yellow-500 text-center">No Data Found!</p>
  );
};

export default CustumTable;
