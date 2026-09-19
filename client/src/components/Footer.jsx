import { profile } from "../data/content.js";

export default function Footer() {
  return (
    <footer>
      <div className="container footer-row">
        <span>
          © {new Date().getFullYear()} {profile.name} — {profile.credentials}
        </span>
        <ul className="footer-links">
          <li><a href="#research">Research</a></li>
          <li><a href="#publications">Publications</a></li>
          <li><a href="#contact">Contact</a></li>
          <li><a href="#top">Back to top</a></li>
        </ul>
      </div>
    </footer>
  );
}
