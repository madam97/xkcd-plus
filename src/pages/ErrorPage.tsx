import React from 'react';
import { Link } from 'react-router-dom';
import ErrorSection from '../components/ErrorSection';

/**
 * The Error page's component
 * @category Page
 * @component
 * @returns {JSX.Element}
 */
const ErrorPage = (): JSX.Element => {
  return (
    <main>
      <ErrorSection title="404" msg="Ooops, something went wrong...">
        <Link className="btn-primary" to="/">Back to home</Link>
      </ErrorSection>
    </main>
  )
}

export default ErrorPage;