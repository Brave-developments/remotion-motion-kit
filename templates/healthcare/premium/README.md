# Healthcare Premium Clinical UI

Optional component collection under the original healthcare visual style. It adds polished UI panels without introducing extra packages or changing the previous six scene modes.

- `clinical-monitor`: `ClinicalMonitor.tsx`, simulated HR, SpO₂, respiratory rate, BP and schematic ECG.
- `abg-dashboard`: `ABGPanel.tsx`, pH / PaCO₂ / HCO₃⁻ / PaO₂ teaching gauges with illustrative adult reference intervals.
- `vital-trend`: `VitalTrend.tsx`, animated trend path and time labels using caller-supplied data.

Sample:
```tsx
import { HealthcarePremium } from './templates/healthcare/premium/HealthcarePremium';
<HealthcarePremium
  mode="abg-dashboard"
  headline="ABGs without memorising blindly"
  abg={{ ph:7.4, paCO2:40, bicarbonate:24, oxygen:90 }}
/>
```

Preview: `npm run studio` → `HealthcarePremiumDemo`. Render: `npm run render:healthcare-premium`.

**Important:** All dashboard values are examples. They are not derived from medical equipment. This project does not produce diagnoses, triage instructions, clinical alarms, ABG compensation calculations, or patient care decisions. Reference ranges and units vary by context and laboratory; verify medical scripts and visuals before use.
