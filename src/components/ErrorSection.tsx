import React from 'react';

type ErrorSectionProps = {
  title?: string,
  subtitle?: string,
  msg: string,
  children?: React.ReactNode | React.ReactNode[]
}

export default function ErrorSection({ title, subtitle, msg, children }: ErrorSectionProps) {
  return (
    <section className="container text-center">
      {title && <h1>{title}</h1>}
      {subtitle && <p className="title">{subtitle}</p>}

      <p>{msg}</p>

      {children}
    </section>
  )
}