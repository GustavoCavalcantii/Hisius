import { color } from "@hisius/ui/theme/colors";
import { ManchesterTriage } from "@hisius/enums";

export const getRiskColor = (risk: ManchesterTriage | null) => {
  if (risk === null) {
    return color.triage.emergency;
  }

  switch (risk) {
    case ManchesterTriage.Emergency:
      return color.triage.emergency;

    case ManchesterTriage.VeryUrgent:
      return color.triage.veryUrgent;

    case ManchesterTriage.Urgent:
      return color.triage.urgent;

    case ManchesterTriage.Standard:
      return color.triage.standard;

    case ManchesterTriage.NonUrgent:
      return color.triage.nonUrgent;

    default:
      return color.triage.emergency;
  }
};
