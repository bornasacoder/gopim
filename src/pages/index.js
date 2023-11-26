import Image from "next/image";
import { Inter } from "next/font/google";

import ProviderSearch from "./providers";
import HomePage from "./landingpage";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return <HomePage />;
}
