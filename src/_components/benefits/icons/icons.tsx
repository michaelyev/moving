import Image from "next/image";

interface IconsType {
  [key: string]: JSX.Element;
}
export const icons: IconsType = {
  "Free Quotes": (
    <Image
      src="/quotes.svg"
      alt="Loading and Transportation"
      width={32}
      height={32}
    />
  ),
  "Licensed and Insured": (
    <Image
      src="/licensed.svg"
      alt="Loading and Transportation"
      width={32}
      height={32}
    />
  ),
  "Upfront and Honest Pricing": (
    <Image
      src="/pricing.svg"
      alt="Loading and Transportation"
      width={32}
      height={32}
    />
  ),
  "Expert Packing Services": (
    <Image
      src="/expertPacking.svg"
      alt="Loading and Transportation"
      width={32}
      height={32}
    />
  ),
  "Comprehensive Planning": (
    <Image
      src="/calendar.svg"
      alt="Loading and Transportation"
      width={32}
      height={32}
    />
  ),
  "Flexible Scheduling": (
    <Image
      src="/scheduling.svg"
      alt="Loading and Transportation"
      width={32}
      height={32}
    />
  ),
};
