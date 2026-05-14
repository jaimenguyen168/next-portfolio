/**
 * Minimal `cn` helper — merges class names, filters falsy values.
 * Drop-in compatible with the clsx + tailwind-merge version used by shadcn.
 */
export function cn(
  ...inputs: (string | undefined | null | false | 0)[]
): string {
  return inputs.filter(Boolean).join(" ");
}
