"use client"

import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";
import Image from "next/image";


type ProjectItem = {
  referencedObject: string; //Object ID
  model: {
    name: string;
    id: string;
    createdAt: string;
    previewUrl?: any;
  };
};


const dummy_data = {
  "data": {
    "project": {
      "models": {
        "items": [
          {
            "createdAt": "2025-02-15T21:30:41.254Z",
            "id": "ce3f0b9c63",
            "displayName": "g-panel g5s",
            "versions": {
              "items": [
                {
                  "referencedObject": "9508a093d0940529a39a82606135963a"
                }
              ]
            }
          },
          {
            "createdAt": "2025-02-15T21:29:38.304Z",
            "id": "a63a310de6",
            "displayName": "kvh trio beam",
            "versions": {
              "items": [
                {
                  "referencedObject": "9577c04c907a389456d1c6d42a03544d"
                }
              ]
            }
          },
          {
            "createdAt": "2025-02-15T21:29:14.807Z",
            "id": "8ef6a8d6bf",
            "displayName": "kvh duo beam",
            "versions": {
              "items": [
                {
                  "referencedObject": "18dc02642244fda1bb2cd1802b8d980f"
                }
              ]
            }
          }
        ]
      }
    }
  }
}


export default function Home() {
  // const router = useRouter();
  // const [projects, setProjects] = useState<ProjectItem[]>([]);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const response = await fetch("http://localhost:8000/projects", { cache: "no-store" });
  //       if (!response.ok) throw new Error("Failed to fetch project versions");
  //       const data = await response.json();
  //       setProjects(data);
  //     } catch (error) {
  //       console.error("Error fetching projects:", error);
  //     } finally {
  //       // setLoading(false);
  //     }
  //   })();
  // }, []);

  // if (loading) return <p>Loading...</p>;

  return (
    <main className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">My Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <p>{JSON.stringify(dummy_data)}</p>

        {/* {projects.map(({ model, referencedObject }) => (
          <Card
            key={model.id}
            className="p-6 cursor-pointer shadow transition-transform transform hover:scale-105"
            onClick={() => router.push(`/dashboard/${model.id}?referencedObject=${referencedObject}`)} // Pass both model.id and referencedObject
          >
            <h2 className="text-xl font-semibold mb-2">{model.name.charAt(0).toUpperCase() + model.name.slice(1)}</h2>
            <p className="text-gray-600 mb-2">ID: {model.id}</p>
            <p className="text-gray-600 mb-2">
              Created: {new Date(model.createdAt).toLocaleString()}
            </p>
            <p className="text-gray-600">Referenced Object: {referencedObject}</p>
            <Image
              src={model.previewUrl}
              alt={model.name}
              width={300}
              height={300}
              style={{ objectFit: "contain" }}
            />
          </Card>
        ))} */}
      </div>
    </main>
  );
}