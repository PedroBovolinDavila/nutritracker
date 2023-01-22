export function addListHtmlTag(contents: string[], prev: string) {
  const list = `${contents.map(
    (content) => `<li className="w-full">${content}`,
  )}`

  return prev + list.replaceAll(',', ' ')
}
