import React from 'react';
import { Link } from 'react-router-dom';
import ErrorSection from '../components/ErrorSection';

export default function ErrorPage() {
  return (
    <main>
      <ErrorSection title="404" msg="Ooops, something went wrong...">
        <Link className="btn-primary" to="/">Back to home</Link>
      </ErrorSection>
    </main>
  )
}