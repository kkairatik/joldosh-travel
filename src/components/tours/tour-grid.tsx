import { TourCard } from "@/components/tours/tour-card";
import type { Destination, Tour } from "@/lib/tours/schema";

type Props = {
  tours: Tour[];
  destinations: Record<string, Destination>;
};

export function TourGrid({ tours, destinations }: Props) {
  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {tours.map((tour) => (
        <li key={tour.slug}>
          <TourCard tour={tour} destination={destinations[tour.destination]} />
        </li>
      ))}
    </ul>
  );
}
