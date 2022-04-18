import React from 'react';

/** 
 * ErrorSectionProps
 * @category Component
 */
type ErrorSectionProps = {
  /** The title that appears in a h1 tag */
  title?: string,
  /** The subtitle that appears in a p tag */
  subtitle?: string,
  /** The message that appears under the title */
  msg: string,
  /** The component(s) that appears under the message */
  children?: React.ReactNode | React.ReactNode[]
}

/**
 * Shows a section with error title and message. Also able to pass any other components on children like link to home page.
 * @category Component
 * @component
 * @param {ErrorSectionProps} props
 * @returns {JSX.Element}
 */
const ErrorSection = ({ title, subtitle, msg, children }: ErrorSectionProps): JSX.Element => {
  return (
    <section className="container text-center">
      {title && <h1>{title}</h1>}
      {subtitle && <p className="title">{subtitle}</p>}

      <p>{msg}</p>

      {children}
    </section>
  )
}

export default ErrorSection;