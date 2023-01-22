export type TagOptions = 'h1' | 'h2' | 'p'

export function addCommunHtmlTag(
  tag: TagOptions,
  content: string,
  prev: string,
) {
  switch (tag) {
    case 'h1':
      return (
        prev +
        `<${tag} className="text-2xl w-full text-center font-bold">${content}</${tag}> \n`
      )
    case 'h2':
      return (
        prev + `<${tag} className="text-xl font-bold">${content}</${tag}> \n`
      )
    case 'p':
      return prev + `<${tag} className="text-md">${content}</${tag}> \n`
  }
}
