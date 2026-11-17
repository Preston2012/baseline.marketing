import Image from "next/image";
import { BADGE_APPSTORE, BADGE_GOOGLEPLAY } from "../config/brand-assets";
import { site } from "@/config/site";

/** Store badge with no link yet. The app is not in either store.
 *  It is a plain image, not a button, so nothing on it looks clickable. */
export function StoreCTA({
  store
}: {
  store: "appstore" | "googleplay";
}) {
  const badge =
    store === "appstore"
      ? { src: BADGE_APPSTORE, alt: "App Store, coming soon" }
      : { src: BADGE_GOOGLEPLAY, alt: "Google Play, coming soon" };

  return (
    <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", opacity: 0.9 }}>
      <Image
        src={badge.src}
        alt={badge.alt}
        width={180}
        height={52}
        style={{ height: "auto", width: "100%", maxHeight: 52, display: "block", objectFit: "contain" }}
      />
    </div>
  );
}

/** Both badges, the coming-soon line, and the support email link. */
export function StoreBadges({ marginTop = 16 }: { marginTop?: number }) {
  return (
    <div style={{ marginTop }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 10,
        }}
      >
        <StoreCTA store="appstore" />
        <StoreCTA store="googleplay" />
      </div>
      <p className="data" style={{ color: "var(--sub)", fontSize: 12, textAlign: "center", margin: "10px 0 0" }}>
        Coming to Google Play and the App Store.{" "}
        <a href={`mailto:${site.contact.support}`}>{site.contact.support}</a>
      </p>
    </div>
  );
}
