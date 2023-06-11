
/**
 * Temporary fix for heroicons imports not being recognized by typescript
 */
declare module "@heroicons/react/outline" {
  export const MenuIcon = (props: React.ComponentProps<"svg">) => JSX.Element;
  export const XIcon = (props: React.ComponentProps<"svg">) => JSX.Element;
}
