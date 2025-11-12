import { forwardRef, type ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type Props = ComponentProps<"div"> & {};
const CinemaScreen = forwardRef<HTMLDivElement, Props>(
  ({ className, ...props }, ref) => {
    return (
      <section
        className={twMerge(
          "cinema-screen flex flex-col items-center",
          className,
        )}
        ref={ref}
        {...props}
      >
        <p>Screen</p>
        <svg viewBox="0 0 600 100" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0,80 Q300,0 600,80"
            stroke="#ececec"
            strokeWidth="8"
            fill="none"
          />
        </svg>
      </section>
    );
  },
);

CinemaScreen.displayName = "CinemaScreen";

export default CinemaScreen;
