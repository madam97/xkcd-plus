interface IComic {
  num: number,
  img: string,
  alt: string,
  title: string,
  transcript: string | null,
  date: Date
}

export default IComic;