import styled from "@emotion/styled/macro"

type Props = import("react").SVGAttributes<SVGElement> & {
  children: import("react").ReactNode
}

export function Container({ children, ...props }: Props) {
  return (
    <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" {...props}>
      {children}
    </SVG>
  )
}

const SVG = styled.svg({
  height: "1em",
  width: "1em",
})
