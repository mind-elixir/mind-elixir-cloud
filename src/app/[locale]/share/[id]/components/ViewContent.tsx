"use client";

import dynamic from "next/dynamic";
import { Brain, List } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Outliner } from "react-outliner-neo";
import { MindMapSkeleton } from "./MindMapSkeleton";
import type { MindElixirData, Options } from "mind-elixir";

// 确保MindElixirReact组件完全在客户端渲染
const MindElixirReact = dynamic(() => import("@/components/MindElixirReact"), {
  ssr: false,
  loading: () => <MindMapSkeleton />,
});

type ViewMode = "mindmap" | "outline" | "split";

interface ViewContentProps {
  viewMode: ViewMode;
  mapData: MindElixirData;
  plugins: any[];
  options: Partial<Options>;
}

export function ViewContent({
  viewMode,
  mapData,
  plugins,
  options,
}: ViewContentProps) {
  return (
    <div className="flex flex-col gap-4">
      {/* 思维导图视图 */}
      <Card
        className={`overflow-hidden border border-gray-200 dark:border-gray-800 shadow-strong bg-white dark:bg-gray-900 floating-card mindmap-container ${
          viewMode !== "mindmap" && viewMode !== "split" ? "hidden" : ""
        }`}
        style={{ display: viewMode === "outline" ? "none" : undefined }}
      >
        {viewMode === "split" && (
          <CardHeader className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
            <CardTitle className="flex items-center gap-3 text-lg font-semibold text-gray-900 dark:text-gray-100">
              <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700">
                <Brain className="w-4 h-4 text-gray-700 dark:text-gray-300" />
              </div>
              思维导图视图
            </CardTitle>
          </CardHeader>
        )}
        <CardContent className="p-0">
          <div
            className={`${
              viewMode === "split"
                ? "h-[calc(100vh-380px)] min-h-[500px]"
                : "h-[calc(100vh-280px)] min-h-[600px]"
            }`}
          >
            <MindElixirReact
              data={mapData}
              plugins={plugins}
              options={options}
              className="h-full w-full"
            />
          </div>
        </CardContent>
      </Card>

      {/* 大纲视图 */}
      <Card
        className={`overflow-hidden border border-gray-200 dark:border-gray-800 shadow-strong bg-white dark:bg-gray-900 floating-card ${
          viewMode !== "outline" && viewMode !== "split" ? "hidden" : ""
        }`}
        style={{ display: viewMode === "mindmap" ? "none" : undefined }}
      >
        <CardHeader className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
          <CardTitle className="flex items-center gap-3 text-lg font-semibold text-gray-900 dark:text-gray-100">
            <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700">
              <List className="w-4 h-4 text-gray-700 dark:text-gray-300" />
            </div>
            思维导图大纲
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="h-[calc(100vh-380px)] min-h-[500px] overflow-auto custom-scrollbar">
            <Outliner data={mapData.nodeData.children!} readonly />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
