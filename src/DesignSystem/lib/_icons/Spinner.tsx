import { Container } from "./Container"

function Spinner() {
  return (
    <Container viewBox="0 0 128 128" fill="currentColor">
      <g>
        <circle cx="16" cy="64" r="16" />
        <circle cx="16" cy="64" r="14" transform="rotate(45 64 64)" />
        <circle cx="16" cy="64" r="13" transform="rotate(90 64 64)" />
        <circle cx="16" cy="64" r="11" transform="rotate(135 64 64)" />
        <circle cx="16" cy="64" r="10" transform="rotate(180 64 64)" />
        <circle cx="16" cy="64" r="8" transform="rotate(225 64 64)" />
        <circle cx="16" cy="64" r="6" transform="rotate(270 64 64)" />
        <circle cx="16" cy="64" r="5" transform="rotate(315 64 64)" />
        <animateTransform
          attributeName="transform"
          calcMode="discrete"
          dur="560ms"
          repeatCount="indefinite"
          type="rotate"
          values="0 64 64;315 64 64;270 64 64;225 64 64;180 64 64;135 64 64;90 64 64;45 64 64"
        />
      </g>
    </Container>
  )
}

export { Spinner }
