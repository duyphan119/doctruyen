import Link from "next/link";
import { statuses } from "./header";
import { buttonVariants } from "../ui/button";

export default function Footer() {
  return (
    <footer className="bg-secondary-foreground text-secondary py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left">
            <h1 className="text-2xl font-bold">DOCTRUYEN</h1>
          </div>
          <div className="mt-4 md:mt-0">
            <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
              {statuses.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/danh-sach/${item.slug}`}
                    className="hover:text-neutral-400"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-8 text-center md:text-left">
          <p>
            &copy; {new Date().getFullYear()} DOCTRUYEN. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
