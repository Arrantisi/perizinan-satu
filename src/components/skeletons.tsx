import { Skeleton } from "./ui/skeleton";
import { TableCell, TableRow } from "./ui/table";

const columns = [
  {
    id: "5f5bfd44-7fac-5927-9f9b-e7fab2b37e1f",
  },
  {
    id: "49212242-c291-5d7e-8484-a1f08b5d8bd8",
  },
  {
    id: "fe8f9bf4-4696-50a9-a405-a44bce671e20",
  },
  {
    id: "d014c8a1-d31e-5e45-b079-a79affb53d1b",
  },
  {
    id: "f8d55e40-9365-587d-8f97-d4eee2a9b236",
  },
  {
    id: "bb7d76d7-a894-5b60-a09d-6e3d90e59f0a",
  },
  {
    id: "b1bbd1d6-9c19-5eac-a615-97598d41cf2c",
  },
  {
    id: "02a1d26a-b12f-5673-af57-3f3efd27da23",
  },
  {
    id: "23496d35-b0da-5b43-a1fd-093a141f0112",
  },
  {
    id: "42567496-b690-516c-9f1d-9c435034a2b5",
  },
  {
    id: "7a55f6aa-ce27-5f56-b06d-189528b11a31",
  },
  {
    id: "b96b8e8f-a87a-5cac-b64d-fbad97cbf446",
  },
  {
    id: "ccbf6e8d-c1d1-5aff-9799-ca755fa369c3",
  },
  {
    id: "1947d936-3f21-5c09-9296-c16c3b1933ae",
  },
  {
    id: "e349dc45-b13c-5b2c-b8fb-ea0bbced755f",
  },
];

export const SkeletonTable = () => {
  return (
    <>
      {columns.map((colum) => (
        <TableRow key={colum.id}>
          <TableCell className="" colSpan={6}>
            <Skeleton className="h-5" />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};
