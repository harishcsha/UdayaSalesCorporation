import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 pt-40 pb-24 text-center">
      <h1 className="font-display text-6xl text-outline mb-4">404</h1>
      <p className="font-body text-mute mb-8">This page walked off somewhere. Let's get you back.</p>
      <Link to="/" className="bg-brass text-ink font-display px-8 py-3 tracking-wide">
        BACK HOME
      </Link>
    </div>
  );
}
