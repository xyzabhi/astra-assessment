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
  isLoading: boolean;
}
const SHEET_SIDES = ["top", "right", "bottom", "left"] as const;

type SheetSide = (typeof SHEET_SIDES)[number];

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
      <Sheet key={"side"}>
        <SheetTrigger asChild>
          <TableRow key={12} className="hover:cursor-pointer">
            {tableHeaders.map((key) => (
              <TableCell key={key}>{row[key]}</TableCell>
            ))}
          </TableRow>
        </SheetTrigger>
        <SheetContent side={"bottom"}>
          <SheetHeader>
            <SheetTitle>{row.Name}</SheetTitle>
            <SheetDescription>
              Make changes to your profile here. Click save whenre done.
              <Button>Hello</Button>
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4"></div>
          </div>
        </SheetContent>
      </Sheet>
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
