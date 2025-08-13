/**
 * Portfolio Projects Data
 *
 * Centralized data for portfolio projects.
 */

import type { PortfolioProject } from "./types";

// Import images
import ExtraleichtPage from "@/assets/images/extraleicht.png";
import SustaynPage from "@/assets/images/sustayn.png";
import PlegehilfePage from "@/assets/images/verbund-pflegehilfe.png";
import Football365ScoresPage from "@/assets/images/365-scores.png";

export const PORTFOLIO_PROJECTS: readonly PortfolioProject[] = [
  {
    company: "Verbund Pflegehilfe",
    year: "2023 - Present",
    title: "Free Care Advice & Provider Matching Service",
    results: [
      { title: "Free personalized care consultation" },
      { title: "Matching with local care providers" },
      { title: "Support for obtaining care aids" },
      { title: "Guidance on subsidies & financing" },
      { title: "Advice on barrier-free home solutions" },
    ],
    link: "https://www.pflegehilfe.org",
    image: PlegehilfePage,
    imageWidth: 1629,
    imageHeight: 1032,
  },
  {
    company: "Sustayn GmbH",
    year: "2021-2023",
    title: "Employee Engagement Platform for Sustainability",
    results: [
      { title: "Gamified sustainability engagement" },
      { title: "Microlearning & knowledge sharing" },
      { title: "Challenges, events & rewards" },
      { title: "Idea management & co-determination" },
      { title: "Integration with intranet & apps" },
    ],
    link: "https://app.sustayn.de",
    image: SustaynPage,
    imageWidth: 800,
    imageHeight: 507,
  },
  {
    company: "Extraleicht GmbH & Co. KG",
    year: "2019-2021",
    title: "Extraleicht",
    results: [
      { title: "Heating oil price calculator" },
      { title: "Online heating oil ordering" },
      { title: "Tank service solutions" },
      { title: "Lubricants & operating supplies" },
      { title: "Customer service & contact" },
    ],
    link: "https://extraleicht.com",
    image: ExtraleichtPage,
    imageWidth: 800,
    imageHeight: 507,
  },
  {
    company: "365Scores",
    year: "2017 - 2018",
    title: "365Scores – Real-Time Sports Scores & Personalized Updates",
    results: [
      { title: "Live scores and real-time sports updates" },
      { title: "Personalized feeds for teams, leagues, and players" },
      { title: "Comprehensive coverage of multiple sports" },
      { title: "Sports betting insights and information" },
      { title: "Publisher tools for live score integration and monetization" },
    ],
    link: "https://www.365scores.com",
    image: Football365ScoresPage,
    imageWidth: 1629,
    imageHeight: 1032,
  },
] as const;
