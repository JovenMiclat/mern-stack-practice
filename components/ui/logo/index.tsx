import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/">
      <span className="font-black text-3xl tracking-widest text-transparent bg-clip-text bg-gradient-to-r to-purple-400 from-pink-600 cursor-pointer font-barcode">
        INAGA
      </span>
    </Link>
  );
};

export default Logo;
