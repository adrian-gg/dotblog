const classNames = (
  ...classes: (string | boolean | undefined | null)[]
): string => classes.filter(Boolean).join(" ")

export default classNames
