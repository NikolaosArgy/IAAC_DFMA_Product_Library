import React, { useEffect } from "react";
import {
  Viewer,
  DefaultViewerParams,
  SpeckleLoader,
  UrlHelper,
  CameraController,
  SelectionExtension,
  FilteringExtension,
} from "@speckle/viewer";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

declare global {
  interface Window {
    filteringExtension: any; // Adjust the type according to your use case
    speckleViewer: any;
    focusingExtension: any;
  }
}

type ObjectIdProps = {
  obj_id: string;
};

const SpeckleViewer: React.FC<ObjectIdProps> = ({ obj_id }) => {

  useEffect(() => {
    async function main() {

      const container = document.getElementById("renderer");

      if (!container) {
        console.error("Renderer container not found!");
        return;
      }

      // Avoid initializing if the viewer already exists
      if (container.hasChildNodes()) {
        console.warn("Viewer already initialized. Skipping...");
        return;
      }

      const params = DefaultViewerParams;

      params.verbose = true;

      const viewer = new Viewer(container, params);
      await viewer.init();

      // Add extensions
      viewer.createExtension(CameraController);
      viewer.createExtension(SelectionExtension);
      const filteringExtension = viewer.createExtension(FilteringExtension);

      console.log(obj_id)
      const url_string = `https://app.speckle.systems/projects/86828cd7fe/models/${obj_id}`

      const urls = await UrlHelper.getResourceUrls(url_string);

      for (const url of urls) {
        const loader = new SpeckleLoader(viewer.getWorldTree(), url, "");
        await viewer.loadObject(loader, true);
      }

      // Expose viewer and filteringExtension for interaction
      window.speckleViewer = viewer;
      window.filteringExtension = filteringExtension;

      viewer.resize();

    }

    main();
  }, [obj_id]); // 👈 Ensures `useEffect` runs **only once**

  return (

    <Card className="w-[550px] h-[700px]">
      <CardHeader>
        <CardTitle>Speckle 3D Viewer</CardTitle>
        <CardDescription>
          This is using the SpeckleLoader 3D Viewer
        </CardDescription>
      </CardHeader>
      <CardContent className="relative h-[550px] overflow-hidden" >
        <div id="renderer" className="w-full h-full"></div>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Zoom and Rotate
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>)
};

export default SpeckleViewer;
