interface FooterLink {
  label: string
  to: string
}

export function useFooter() {
  const links: FooterLink[] = []

  return {
    links,
  }
}
