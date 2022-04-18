/** IImage */
interface IImage {
  /** Source url or path of the image */
  src: string,
  /** Alt text of the image */
  alt: string,
  /** Title of the image */
  title: string,
  /** Url that loads after clicking on the image */
  link?: string
}

export default IImage;