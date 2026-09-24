export default function Logo({ size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <rect width="40" height="40" rx="8" fill="#2F4538" />
      {/* House roof + body */}
      <path
        d="M20 9L29 16.5V29.5C29 30.3 28.3 31 27.5 31H12.5C11.7 31 11 30.3 11 29.5V16.5L20 9Z"
        stroke="#C08A3E"
        strokeWidth="1.8"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Door */}
      <rect x="17.5" y="23" width="5" height="8" fill="#C08A3E" />
      {/* Root lines beneath, symbolizing "rooted" */}
      <path
        d="M20 31V34M17 32.5L15 35M23 32.5L25 35"
        stroke="#F6F3ED"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  )
}