import Image from "next/image";

interface Props {
  className?: string;
}

const Logo = ({ className = "" }: Props) => (
  <Image
    className={`h-14 object-cover object-center ${className}`}
    src="/images/logo-light-1.png"
    alt="Bizprofy logo"
    height={150}
    width={150}
  />
);

export { Logo };
