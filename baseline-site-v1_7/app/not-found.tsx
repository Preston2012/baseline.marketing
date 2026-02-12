import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/Card";

export const metadata: Metadata = {
  title: "Page Not Found"
};

export default function NotFound() {
  return (
    <section className="section" aria-label="Not found">
      <h1 className="h2">Page not found</h1>
      <p className="p">This route does not exist.</p>

      <Card title="Next steps">
        <p className="p" style={{ margin: 0 }}>
          Return to <Link href="/">Home</Link>, or contact{" "}
          <a href="mailto:support@baseline.marketing">support@baseline.marketing</a>.
        </p>
      </Card>
    </section>
  );
}
