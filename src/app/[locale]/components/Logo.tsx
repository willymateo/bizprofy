import Image from "next/image";
import Link from "next/link";

const Logo = () => (
  <Link href="/">
    <Image
      className="h-14 object-cover object-center"
      src="/images/logo-light-2-removebg.png"
      alt="Bizprofy logo"
      height={150}
      width={150}
    />
  </Link>
);

export { Logo };
