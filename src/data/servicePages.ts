import {
  PHASES_EN,
  getServiceById,
  getServicePillars,
  getServices,
  type ServiceCategory,
  type ServiceItem,
  type ServicePillar,
} from "@/data/servicesData";
import { serviceLines } from "@/data/navigation";

// Lookups for the services pages: /services, /services/<line> and /services/<service>.

export const lines = getServicePillars();
export const allServices = getServices();

export function lineById(id: string): ServicePillar | undefined {
  return lines.find((l) => l.id === id);
}

export function serviceById(id: string): ServiceItem | undefined {
  return getServiceById(id);
}

export function servicesInLine(id: ServiceCategory): ServiceItem[] {
  return allServices.filter((s) => s.category === id);
}

export function phasesForLine(id: ServiceCategory) {
  return PHASES_EN[id];
}

/** Short name used in navigation ("ERP & Digital" rather than the full title). */
export function lineShortName(id: ServiceCategory): string {
  return serviceLines.find((l) => l.id === id)?.title ?? lineById(id)?.title ?? id;
}

/**
 * Up to three related services: the ones sharing the most topics, preferring other
 * service lines on a tie so visitors see how consulting, training and systems connect.
 */
export function relatedServices(service: ServiceItem, count = 3): ServiceItem[] {
  const words = (s: ServiceItem) =>
    new Set([...s.tags, ...s.deliverables].join(" ").toLowerCase().split(/[^a-z0-9]+/).filter((w) => w.length > 2));
  const mine = words(service);
  return allServices
    .filter((s) => s.id !== service.id)
    .map((s) => {
      let shared = 0;
      words(s).forEach((w) => mine.has(w) && shared++);
      return { s, score: shared + (s.category !== service.category ? 0.5 : 0) };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
    .map(({ s }) => s);
}
