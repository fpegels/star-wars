import { Link } from "react-router-dom";
import styled from "@emotion/styled/macro";
import { colors } from "../_theme";

type Props = {
  links: {
    id: string;
    name: string;
    url: string;
  }[];
};

export function Breadcrumb({ links }: Props) {
  const lastIndex = links.length - 1;

  return (
    <Container>
      {links.map((link, index) => {
        const isLast = lastIndex === index;
        return (
          <Item key={link.id}>
            <StyledLink to={link.url}>{link.name}</StyledLink>
            {!isLast && <Separator>/</Separator>}
          </Item>
        );
      })}
    </Container>
  );
}

const Container = styled.ol({
  listStyle: "none",
  display: "flex",
  alignItems: "center",
  padding: 0,
  margin: 0,
  cursor: "default",
  color: colors.white,
});

const Item = styled.li({
  fontSize: "1rem",
});

const StyledLink = styled(Link)({
  color: colors.white,
  textDecoration: "none",
});

const Separator = styled.span({
  display: "inline",
  fontSize: "1rem",
  margin: "auto 0.8rem",
});
