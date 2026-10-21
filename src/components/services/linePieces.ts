import { Compass, GraduationCap, MonitorCog } from "lucide-react";
import type { ServiceCategory } from "@/data/servicesData";

/** Each service line's logo-piece colour, icon tile and icon. */
export const PIECE: Record<ServiceCategory, { color: string; tile: string; Icon: typeof Compass }> = {
  consulting: { color: "#25346B", tile: "bg-navy", Icon: Compass },
  training: { color: "#9BB3D9", tile: "bg-steel text-navy", Icon: GraduationCap },
  digital: { color: "#9B391E", tile: "bg-rust", Icon: MonitorCog },
};
