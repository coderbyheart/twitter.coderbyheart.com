import { marked } from "marked";

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function monthName(month: string): string {
  const idx = parseInt(month, 10) - 1;
  return MONTH_NAMES[idx] ?? month;
}

export function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toUTCString().replace(" GMT", " UTC");
}

const renderer = new marked.Renderer();
const origImage = renderer.image.bind(renderer);
renderer.image = function ({ href, title, text }) {
  if (href?.endsWith(".mp4") || href?.endsWith(".webm")) {
    return `<video src="${href}" controls preload="metadata" class="tweet-media"></video>`;
  }
  return `<img src="${href ?? ""}" alt="${text ?? ""}"${title ? ` title="${title}"` : ""} loading="lazy" class="tweet-media" />`;
};

marked.setOptions({
  gfm: true,
  breaks: true,
  renderer,
});

export function renderMarkdown(md: string): string {
  return marked.parse(md, { async: false }) as string;
}
