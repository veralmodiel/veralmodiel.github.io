export interface SiteSection {
  id: string
  marker: string
  label: string
}

export const sections: SiteSection[] = [
  { id: "about", marker: "A", label: "Intro" },
  { id: "skills", marker: "B", label: "Toolkit" },
  { id: "lab", marker: "C", label: "Lab" },
  { id: "contact", marker: "D", label: "Contact" },
]
