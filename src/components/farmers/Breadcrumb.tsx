"use client";

import Link from 'next/link';

export function Breadcrumb() {
  return (
    <div className="flex items-center gap-2 text-primaryText m-4 ">
      <Link href="/" className="hover:text-foreground">Dashboard</Link>
      <span> > </span>
      <Link href="/" className="hover:text-foreground">Farmers</Link>
      <span> > </span>
      <span className="text-primary font-bold">Farmer Detail</span>
    </div>
  );
}