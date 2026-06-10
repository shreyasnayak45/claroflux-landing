/**
 * Real product screenshots, captured from the live ClaroFlux app in both
 * themes. Dimensions are intrinsic pixel sizes — required by next/image.
 */
export interface ShotVariant {
  src: string;
  width: number;
  height: number;
}

export interface Shot {
  light: ShotVariant;
  dark: ShotVariant;
}

function shot(
  name: string,
  lw: number,
  lh: number,
  dw: number,
  dh: number,
): Shot {
  return {
    light: { src: `/shots/light/${name}.png`, width: lw, height: lh },
    dark: { src: `/shots/dark/${name}.webp`, width: dw, height: dh },
  };
}

export const SHOTS = {
  dashboard: shot("dashboard", 1917, 907, 1568, 737),
  dashboardDetail: shot("dashboard-detail", 1917, 907, 1568, 741),
  companionBrief: shot("companion-brief", 561, 786, 567, 793),
  companionChat: shot("companion-chat", 557, 790, 581, 802),
  companionAnswer: shot("companion-answer", 522, 267, 547, 245),
  tracker: shot("tracker", 1917, 907, 1568, 737),
  tasks: shot("tasks", 1917, 907, 1568, 740),
  analytics: shot("analytics", 1917, 906, 1568, 741),
  intelligence: shot("intelligence", 1917, 907, 1568, 741),
  patterns: shot("patterns", 1917, 910, 1568, 741),
  coach: shot("coach", 1917, 907, 1568, 740),
  feedback: shot("feedback", 1547, 210, 1568, 207),
  coachForm: shot("coach-form", 657, 911, 662, 903),
  plan: shot("plan", 847, 677, 886, 683),
  planWhy: shot("plan-why", 846, 802, 888, 740),
  planStart: shot("plan-start", 841, 697, 877, 638),
  focusModal: shot("focus-modal", 557, 910, 558, 883),
} as const;

export type ShotKey = keyof typeof SHOTS;
