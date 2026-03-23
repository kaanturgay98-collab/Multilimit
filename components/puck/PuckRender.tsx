"use client";

import { Render } from "@measured/puck";
import { config } from "@/lib/puck.config";

export function PuckRender({ data }: { data: any }) {
  return <Render config={config} data={data} />;
}
