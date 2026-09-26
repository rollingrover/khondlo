import { notFound } from 'next/navigation';

// Catch unknown paths inside a locale so the localized not-found page renders.
export default function CatchAll() {
  notFound();
}
