"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const farmers = [
  {
    id: 1,
    name: "Amanuf Fababa Ducucu",
    phone: "09010110101",
    region: "oromia",
    woreda: "Alleitu",
    kebele: "01",
    agent: "Kemal belihun"
  },
  {
    id: 2,
    name: "Adrienne Will Ankunding",
    phone: "0912678122",
    region: "oromia",
    woreda: "Alleitu",
    kebele: "02",
    agent: "Ashenafi kunom"
  },
  {
    id: 3,
    name: "Belachew ashcalew",
    phone: "0971345689",
    region: "amhara",
    woreda: "Alleitu",
    kebele: "02",
    agent: "Aster bedane"
  },
  {
    id: 4,
    name: "Nels Franecki Green",
    phone: "09010110101",
    region: "oromia",
    woreda: "Alleitu",
    kebele: "08",
    agent: "dereje degefu"
  },
  {
    id: 5,
    name: "Keanu Beahan Greenfelder",
    phone: "09010110101",
    region: "oromia",
    woreda: "Alleitu",
    kebele: "09",
    agent: "Belachew Kebede"
  }
];

export function NewFarmersTable() {
  return (
    <Card className="text-primaryText">
      <CardHeader>
        <CardTitle className="text-primaryText">List of New Registered  Farmers</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Farmers Name</TableHead>
              <TableHead>Phone Number</TableHead>
              <TableHead>Region</TableHead>
              <TableHead>Woreda</TableHead>
              <TableHead>Kebele</TableHead>
              <TableHead>Registered Agent Name</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {farmers.map((farmer) => (
              <TableRow key={farmer.id}>
                <TableCell>{farmer.name}</TableCell>
                <TableCell>{farmer.phone}</TableCell>
                <TableCell>{farmer.region}</TableCell>
                <TableCell>{farmer.woreda}</TableCell>
                <TableCell>{farmer.kebele}</TableCell>
                <TableCell>{farmer.agent}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}