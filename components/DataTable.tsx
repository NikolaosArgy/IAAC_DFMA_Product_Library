"use client"
import React, { useRef, useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card } from "./ui/card";



export function DataTableComponent({ data }: any) {
  console.log("Received data:", data);

  if (!Array.isArray(data) || data.length === 0) {
    return <div>No data to display.</div>;
  }

  return (
    <Card className="p-2"> 
    <div className="container mx-auto py-10">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Family</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Material Name</TableHead>
            <TableHead>Material Class</TableHead>
            <TableHead>Area</TableHead>
            <TableHead>Volume</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, itemIndex) => {
            const materialNames = item["properties.Material Quantities.*.materialName"] || [];
            const materialClasses = item["properties.Material Quantities.*.materialClass"] || [];
            const areas = item["properties.Material Quantities.*.area"] || [];
            const volumes = item["properties.Material Quantities.*.volume"] || [];
            const materialLength = materialNames.length;

            return Array.from({ length: materialLength }).map((_, materialIndex) => (
              <TableRow key={`${item.id}-${materialIndex}`}>
                <TableCell>{materialIndex === 0 ? item.id : ""}</TableCell>
                <TableCell>{materialIndex === 0 ? item.category : ""}</TableCell>
                <TableCell>{materialIndex === 0 ? item.family : ""}</TableCell>
                <TableCell>{materialIndex === 0 ? item.type : ""}</TableCell>
                <TableCell>{materialNames[materialIndex] || ""}</TableCell>
                <TableCell>{materialClasses[materialIndex] || ""}</TableCell>
                <TableCell>{areas[materialIndex] ? (areas[materialIndex] / 1_000_000).toFixed(3) : ""}</TableCell>
                <TableCell>{volumes[materialIndex] ? (volumes[materialIndex] * 1e-9).toFixed(3) : ""}</TableCell>
              </TableRow>
            ));
          })}
        </TableBody>
      </Table>
    </div>
    </Card>
  );
}
