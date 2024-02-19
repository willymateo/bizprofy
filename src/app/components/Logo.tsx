import Image from "next/image";
import Link from "next/link";

interface Props {
  className?: string;
  href?: string;
}

const Logo = ({ className = "", href = "" }: Props) => (
  <Link className={href ? "" : "pointer-events-none"} href={href}>
    <Image
      className={`h-14 object-cover object-center ${className}`}
      src="/images/logo-light-1.png"
      alt="Bizprofy logo"
      height={150}
      width={150}
    />
  </Link>
);

export { Logo };
