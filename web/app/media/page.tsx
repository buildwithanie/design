import { FeaturedMedia } from "@/components/media/featured-media";
import { LatestMedia } from "@/components/media/latest-media";
import { MediaIntro } from "@/components/media/media-intro";
import { Multimedia } from "@/components/media/multimedia";
import { Publications } from "@/components/media/publications";

export default function MediaPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <MediaIntro />
      <FeaturedMedia />
      <LatestMedia />
      <Publications />
      <Multimedia />
    </main>
  );
}
