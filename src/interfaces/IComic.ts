/** IComic */
interface IComic {
  /** Number of the comic */
  num: number,
  /** Source url of the comic's image */
  img: string,
  /** Alt text of the image */
  alt: string,
  /** Title of the image */
  title: string,
  /** Transcript of the comic */
  transcript: string | null,
  /** The upload date (UTC+0) of the comic */
  date: Date
}

export default IComic;