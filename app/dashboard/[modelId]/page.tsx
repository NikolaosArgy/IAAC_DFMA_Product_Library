"use client";

import { useSearchParams } from 'next/navigation'; // For accessing query params
import { usePathname } from 'next/navigation';

import React, { useEffect, useState } from "react";

import SpeckleViewer from '@/components/Viewer';

import { DataTableComponent } from "@/components/DataTable";
import { ChartBarComponent } from "@/components/ChartBarUI";
import { ChartPieComponent } from "@/components/ChartPieUI";

export default function DashboardPage() {
  const pathname = usePathname(); // Get the current path
  const searchParams = useSearchParams(); // Get the query parameters
  const modelId = pathname?.split("/").pop(); // Extract modelId from pathname (if needed)
  const referencedObject = searchParams?.get("referencedObject"); // Get referencedObject from query params

  const [response, setResponse] = useState<any>(null);

  // Log the referencedObject for debugging
  console.log(referencedObject);

  // useEffect(() => {
  //   if (referencedObject) { // Ensure referencedObject is not empty
  //     const fetchData = async () => {
  //       const res = await fetch("http://localhost:8000/fetch-data", {
  //         method: "POST", // Use POST request
  //         headers: {
  //           "Content-Type": "application/json", // Send JSON in the request body
  //         },
  //         body: JSON.stringify({
  //           id: referencedObject, // Pass referencedObject in the body
  //         }),
  //       });

  //       if (res.ok) {
  //         const data = await res.json();
  //         setResponse(data);
  //         console.log(data);
  //       } else {
  //         console.error("Error fetching data:", res.status, res.statusText);
  //       }
  //     };
  //     fetchData();
  //   }
  // }, [referencedObject]); // Dependency on 'referencedObject'

  console.log(response);

  return (
    <main className="flex min-h-screen flex-col items-center pl-24 pt-24 pr-24 pb-2">
      <div className="w-full max-w-7xl bg-gray-100 p-4 mb-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-2">Selected Project Version</h2>
        <p className="text-gray-700">Referenced Object: {referencedObject}</p>

        {response?.data ? (
          <div className='pt-4'>
            <div className='flex'>
              {/* {modelId && <SpeckleViewer obj_id={modelId} />} */}
              <div className='pl-4 w-full'>
                {/* <ChartBarComponent data={response.data} />
                <ChartPieComponent data={response.data} /> */}
              </div>
            </div>
            <div className='pt-4'>
              {/* <DataTableComponent data={response.data} /> */}
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500">Loading project data...</p>
        )}
      </div>

      {/* Render additional components here if needed */}
    </main>
  );
}
