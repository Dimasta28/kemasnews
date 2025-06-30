import { type SVGProps } from "react";

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <div className="flex items-center gap-2" aria-label="CanvasBlog Home">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6 text-primary"
        {...props}
      >
        <rect width="18" height="18" x="3" y="3" rx="2" />
        <path d="M8 12h4" />
        <path d="M12 8v8" />
      </svg>
      <span className="font-headline text-lg font-semibold text-foreground">
        CanvasBlog
      </span>
    </div>
  );
}
