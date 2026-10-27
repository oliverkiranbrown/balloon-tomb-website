export type IsoDate = `${number}-${number}-${number}`;

export interface Gig {
  date: IsoDate;
  venue: string;
  city: string;
  poster: string;
  ticketUrl?: string;
}

export const gigs: readonly Gig[] = [
  {
    date: "2026-06-05",
    venue: "O2 Academy",
    city: "Bristol",
    poster: "/posters/O2-june-2026.jpeg",
    ticketUrl: "https://www.fatsoma.com/e/2o97q2w0/the-underdog-2026-grand-final",
  },
  { date: "2025-07-20", venue: "The Fleece", city: "Bristol", poster: "/posters/the-fleece-july-2025.jpg" },
  { date: "2025-11-19", venue: "The Thunderbolt", city: "Bristol", poster: "/posters/thunderbolt-nov-2025.jpg" },
  { date: "2026-01-24", venue: "The Thunderbolt", city: "Bristol", poster: "/posters/thunderbolt-jan-2026.jpeg" },
  { date: "2026-04-05", venue: "Thekla", city: "Bristol", poster: "/posters/thekla-april-2026.jpeg" },
  { date: "2026-09-05", venue: "The Old England", city: "Bristol", poster: "/posters/cjc-sept-2026.jpeg" },
  { date: "2026-11-27", venue: "Shredenhams", city: "Bristol", poster: "/posters/shredz.JPG", ticketUrl: "https://hdfst.uk/e164450" },
];

/** Local YYYY-MM-DD, so the comparison never drifts by a day. */
export const isUpcoming = (gig: Gig) =>
  gig.date >= new Date().toLocaleDateString("en-CA");

const ordinal = (n: number) =>
  n % 100 >= 11 && n % 100 <= 13
    ? `${n}th`
    : `${n}${["th", "st", "nd", "rd"][n % 10] ?? "th"}`;

export const formatDate = (gig: Gig) => {
  const d = new Date(`${gig.date}T00:00:00`);
  const weekday = d.toLocaleDateString("en-GB", { weekday: "long" });
  const month = d.toLocaleDateString("en-GB", { month: "long" });
  return `${weekday}, ${ordinal(d.getDate())} ${month} ${d.getFullYear()}`;
};
