import { Rocket, ShieldCheck, Truck, RefreshCw } from "lucide-react";

const props = [
  {
    icon: Truck,
    title: "Free shipping",
    description: "On orders over $50, delivered fast.",
  },
  {
    icon: ShieldCheck,
    title: "2-year warranty",
    description: "Every product covered end to end.",
  },
  {
    icon: RefreshCw,
    title: "30-day returns",
    description: "Changed your mind? No problem.",
  },
  {
    icon: Rocket,
    title: "Launch-day service",
    description: "Priority support when it matters.",
  },
];

export function ValueProps() {
  return (
    <section className="border-t">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        {props.map((prop) => (
          <div key={prop.title} className="flex gap-3">
            <prop.icon className="mt-0.5 size-5 shrink-0 text-primary" />
            <div>
              <div className="font-medium">{prop.title}</div>
              <p className="text-xs text-muted-foreground">{prop.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
