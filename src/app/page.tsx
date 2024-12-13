import CheckHomePageSession from "@/components/auth/checkHomePageSession";

import "leaflet/dist/leaflet.css";

export default function Home() {
  return (
    <CheckHomePageSession>
      <main className="flex min-h-screen  flex-col items-center justify-between p-24">
         Loading Please Wait...
      </main>
    </CheckHomePageSession>
  );
}