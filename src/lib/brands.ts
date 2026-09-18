import clipzoLogo from "@/assets/clipzo-logo.png";
import academyLogo from "@/assets/clipzo-academy-logo.png";
import studioLogo from "@/assets/clipzo-studio-logo-transparent.png";
import clipzoImage from "@/assets/clipzo-production.jpg";
import academyImage from "@/assets/academy-classroom.jpg";
import studioImage from "@/assets/studio-soundstage.jpg";

export type BrandKey = "clipzo" | "academy" | "studio";

export const brands = {
  clipzo: {
    key: "clipzo",
    name: "Clipzo",
    eyebrow: "Creative content production",
    strapline: "Reels • Videography • Photography • Editing",
    title: "Stories engineered for the scroll.",
    description: "A mobile videography and cinematic reel production agency serving Mangaluru, Bengaluru, Kerala, and Vizag. From the first frame to the final grade, we create fast content designed to hold attention and move brands forward.",
    cta: "Start a production",
    room: "The edit suite",
    logo: clipzoLogo,
    image: clipzoImage,
    imageAlt: "Editor working in a cobalt-lit professional post-production suite",
    features: ["Social-first reels", "Brand films", "Editorial photography", "Post-production"],
    stats: [["48h", "Rapid-turn edits"], ["4K", "Delivery standard"], ["01", "Creative partner"]],
  },
  academy: {
    key: "academy",
    name: "Clipzo Academy",
    eyebrow: "One Goal • One Decision • One Direction",
    strapline: "Learn • Create • Master",
    title: "This can change your whole life.",
    description: "A working classroom for creators who learn by making—guided by active filmmakers, editors, and visual storytellers. Take the step, join the next cohort, and move with purpose.",
    cta: "Enroll now",
    room: "The classroom",
    logo: academyLogo,
    image: academyImage,
    imageAlt: "Students learning editing and camera craft in a crimson-lit studio classroom",
    features: ["Cinematic editing", "Camera craft", "Direction & story", "Portfolio mentorship"],
    stats: [["12", "Week cohorts"], ["Live", "Studio practice"], ["1:1", "Mentor reviews"]],
  },
  studio: {
    key: "studio",
    name: "Clipzo Studio",
    eyebrow: "Professional production space",
    strapline: "Shoot • Create • Produce",
    title: "A production floor built to perform.",
    description: "A fully equipped stage, camera systems, lighting, and crew support—ready for commercial shoots, podcasts, and original productions.",
    cta: "Book the studio",
    room: "The soundstage",
    logo: studioLogo,
    image: studioImage,
    imageAlt: "Professional soundstage with camera dolly and yellow-accented studio lighting",
    features: ["Cyclorama stage", "Camera & lenses", "Grip & lighting", "Sound recording"],
    stats: [["Full", "Production floor"], ["Pro", "Camera systems"], ["Ready", "Crew support"]],
  },
} as const;
