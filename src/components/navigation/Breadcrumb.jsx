import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Breadcrumb = () => {
  const pathname = usePathname();
  const paths = pathname.split('/').filter(path => path !== '');
  
  return (
    <section className="px-4 mb-6 md:px-10 lg:px-20 md:mb-8 lg:mb-10 !text-cyan-700">
      <ul className='flex flex-wrap gap-2 overflow-x-auto text-xs font-semibold uppercase'>
        <li className={pathname.pathname === "/" ? "hidden" : "block"}>
          <Link href="/">Home</Link>
          <span className="mx-1">&gt;</span>
        </li>
        {paths.map((path, index) => (
          <React.Fragment key={index}>
            <li>
              <Link href={`/${paths.slice(0, index + 1).join('/')}`}>{path}</Link>
            </li>
            {index < paths.length - 1 && <li className="mx-1">&gt;</li>}
          </React.Fragment>
        ))}
      </ul>
    </section>
  );
};

export default Breadcrumb;
