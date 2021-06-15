//@flow
import React from 'react';
import Link from 'next/link';

type CustomLinkProps = $Exact<{
  useNativeLink?: boolean,
  href?: string,
  children: any,
  ...
}>;

// Sometimes there are some issues using next/link when liking to static dynamic pages
// if we do encounter such issues, we can use this component, and pass in the prop
// "useNativeLink", along with a href. This will just switch to a standard native link.
// It's good to define it in a single component when linking to the CMS especially when
// using with Typography
export default function CustomLink({
  useNativeLink,
  children,
  href,
  ...nextLinkProps
}: CustomLinkProps) {
  return useNativeLink ? (
    <a href={href}>{children}</a>
  ) : (
    <Link href={href} {...nextLinkProps}>
      <a>{children}</a>
    </Link>
  );
}
