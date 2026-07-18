import fs from "fs";
import path from "path";

export type Attorney = {
  slug: string;
  profileUrl: string;
  name: string;
  title: string;
  role: string;
  location: string;
  admissions: string[];
  bio: string[];
  initials: string;
  photo?: string;
};

const BASE: Omit<Attorney, "photo">[] = [
  {
    slug: "peter-antonoplos",
    profileUrl: "https://www.whitefordlaw.com/professionals/peter-d-antonoplos",
    name: "Peter D. Antonoplos",
    title: "Partner · Co-Chair, Trusts & Estates",
    role: "Lead trusts & estates counsel",
    location: "Whiteford national platform",
    admissions: ["District of Columbia", "Maryland", "New York", "Virginia", "U.S. Tax Court", "U.S. Supreme Court"],
    bio: [
      "Peter Antonoplos co-chairs Whiteford's Trusts and Estates section, bringing more than twenty years of experience advising individuals, families, businesses, and institutions on estate planning, trusts, asset protection, and complex estate and gift tax strategy.",
      "He holds an M.B.A. from Yale and an LL.M. in Taxation from Georgetown, and has been recognized by Super Lawyers and as one of America's Top 100 Attorneys. His practice spans sophisticated tax planning, elder-care law, business succession, and planning for non-U.S. citizens.",
    ],
    initials: "PA",
  },
  {
    slug: "jeffrey-schell",
    profileUrl: "https://www.whitefordlaw.com/professionals/jeffrey-r-schell",
    name: "Jeffrey R. Schell",
    title: "Managing Director, Whiteford Mountain West",
    role: "Your Colorado attorney & point of contact",
    location: "Denver, Colorado",
    admissions: ["Colorado", "Michigan", "U.S. District Court, District of Colorado"],
    bio: [
      "Jeff Schell is a Denver-based partner at Whiteford and the Managing Director of Whiteford Mountain West. A Colorado attorney, he was named one of ColoradoBiz Magazine's 25 Most Influential Young Professionals in Colorado.",
      "For trusts and estates matters, Jeff is the firm's Colorado front door: he meets with Colorado families, supervises every Colorado engagement as local counsel, and coordinates Whiteford's national trusts-and-estates depth for each matter.",
    ],
    initials: "JS",
  },
];

export function getAttorneys(): Attorney[] {
  return BASE.map((a) => {
    const rel = `/brand/attorneys/${a.slug}.jpg`;
    const abs = path.join(process.cwd(), "public", rel);
    return { ...a, photo: fs.existsSync(abs) ? rel : undefined };
  });
}

export const JURISDICTION_NOTE =
  "Attorneys are admitted in the jurisdictions listed in their official firm profiles. Colorado matters are supervised and led through Whiteford's Colorado-admitted attorneys, with the firm's national trusts-and-estates counsel engaged on each matter as appropriate and permitted.";
