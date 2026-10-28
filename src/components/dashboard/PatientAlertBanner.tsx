import { AlertTriangle, HeartPulse } from "lucide-react";
import { Button } from "@/components/ui/button";
import { detectMedicalAlerts, parseList } from "@/lib/medicalSafety";

/** Always-visible allergy + medical alert strip on the patient record. */
export function PatientAlertBanner({ allergies, medicalHistory, onEdit }: { allergies?: string | null; medicalHistory?: string | null; onEdit?: () => void }) {
  const list = parseList(allergies);
  const alerts = detectMedicalAlerts(medicalHistory);
  if (!list.length && !alerts.length) {
    return (
      <div className="flex items-center gap-2 rounded-lg border border-dashed border-border px-3 py-2 text-xs text-muted-foreground">
        <HeartPulse className="h-3.5 w-3.5" /> No allergies or medical alerts recorded.
        {onEdit && <Button variant="link" size="sm" className="h-auto p-0 text-xs" onClick={onEdit}>Record now</Button>}
      </div>
    );
  }
  return (
    <div role="alert" className="sticky top-0 z-20 flex flex-wrap items-center gap-2 rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2">
      <AlertTriangle className="h-4 w-4 text-destructive shrink-0" />
      {list.length > 0 && (
        <>
          <span className="text-xs font-semibold uppercase tracking-wide text-destructive">Allergies</span>
          {list.map((a) => (
            <span key={a} className="rounded-full bg-destructive px-2 py-0.5 text-xs font-medium text-destructive-foreground">{a}</span>
          ))}
        </>
      )}
      {alerts.length > 0 && (
        <>
          <span className="ml-1 text-xs font-semibold uppercase tracking-wide text-foreground">Alerts</span>
          {alerts.map((a) => (
            <span key={a} className="rounded-full border border-destructive/40 bg-background px-2 py-0.5 text-xs font-medium text-foreground">{a}</span>
          ))}
        </>
      )}
      {onEdit && <Button variant="ghost" size="sm" className="ml-auto h-7 text-xs" onClick={onEdit}>Update</Button>}
    </div>
  );
}
