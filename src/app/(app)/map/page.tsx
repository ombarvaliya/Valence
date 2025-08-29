import MapLoader from "@/components/MapLoader";

export default function MapPage() {
  return (
    // The key is adding h-full here to make the container fill the 'main' area
    <div className="h-full w-full">
        <MapLoader />
    </div>
  );
}