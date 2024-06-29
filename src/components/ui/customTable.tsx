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
  tableType: any;
}

const CustumTable: React.FC<DataTableProps> = ({ data, tableType }) => {

  if(data.length===0) return <div>No deta found~!</div>;
  // console.log(keysEntityMap[tableType]);
  const tableHeaders = Object.keys(data[0]);
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



  const renderTableBody=()=>
    data.map((row) => (
      <TableRow key={12}>
       {
        tableHeaders.map(key=><TableCell key={key}>{
          row[key]
        }</TableCell>)
       }
      </TableRow>
    ));
  



  

  const invoices = [
    {
      invoice: "INV001",
      paymentStatus: "Paid",
      totalAmount: "$250.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV002",
      paymentStatus: "Pending",
      totalAmount: "$150.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV003",
      paymentStatus: "Unpaid",
      totalAmount: "$350.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV004",
      paymentStatus: "Paid",
      totalAmount: "$450.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV005",
      paymentStatus: "Paid",
      totalAmount: "$550.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV006",
      paymentStatus: "Pending",
      totalAmount: "$200.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV007",
      paymentStatus: "Unpaid",
      totalAmount: "$300.00",
      paymentMethod: "Credit Card",
    },
  ];

  return (
    <div className="m-5 p-5 border border-gray-300 rounded-md">
      <Input
        type="text"
        className="mb-2"
        placeholder="Search ...."
        onChange={(e) => {
          console.log(e.target.value);
        }}
      />

      <Table className="border border-gray-300 rounded-md p-5">
        <TableCaption>A list of your recent invoices.</TableCaption>
        {renderTableHeader()}
        <TableBody>
          {renderTableBody()}
        </TableBody>
      </Table>
      <div className="flex items-center justify-between">
        <Button>Prev</Button>
        <p>2/10</p>
        <Button>Next</Button>
      </div>
    </div>
  );
};

export default CustumTable;
