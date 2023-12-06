import styled from "@emotion/styled";
import { hex, rem } from "@/styles/designSystem";
import Anchor from "./Anchor";

const Container = styled.footer({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: hex.default,
  padding: `${rem(50)} ${rem(25)}`,
  "& .footer": {
    display: "flex",
    flexDirection: "column",
    gap: rem(7),
    "& p": {
      color: hex.white,
    },
    "& ul": {
      display: "flex",
      gap: rem(17),
    },
    "& a": {
      transition: "all .4s cubic-bezier(.4,0,.2,1)",
      position: "relative",
      display: "block",
      borderBottomWidth: "1px",
      borderBottomStyle: "solid",
      padding: `${rem(2)} 0`,
      fontSize: rem(14),
      color: hex.light,
      "&:hover, &:focus": {
        color: hex.white,
        fontWeight: 700,
        "&::after": {
          content: "''",
          position: "absolute",
          bottom: 0,
          left: 0,
          borderRadius: rem(2),
          width: "100%",
          height: rem(2),
          backgroundColor: hex.white,
        },
      },
    },
    "& dl": {
      display: "flex",
      gap: rem(7),
      paddingTop: rem(27),
      "& div": {
        display: "flex",
        gap: rem(7),
        fontSize: rem(14),
        color: hex.light,
        "&::before": {
          content: "'|'",
          paddingRight: rem(2),
        },
        "&:first-of-type::before": {
          display: "none",
        },
      },
      "& dt": {
        fontWeight: 700,
      },
      "& dt, & dd": {
        fontSize: rem(12),
      },
    },
  },
});

export default function Footer() {
  return (
    <Container>
      <div className='footer container'>
        <p className='ss'>&copy; komponent, 2023</p>
        <ul>
          <li>
            <Anchor
              href='https://github.com/naninyang/komponents-frontend'
              className='ss'
            >
              Github repository
            </Anchor>
          </li>
          <li>
            <Anchor href='https://dev1stud.io' className='ss'>
              DEV1L.studio
            </Anchor>
          </li>
        </ul>
        <dl>
          <div>
            <dt>UX Designer</dt>
            <dd>Chloe Ariko</dd>
          </div>
          <div>
            <dt>Frontend & Backend Developer</dt>
            <dd>Chloe Ariko</dd>
          </div>
        </dl>
      </div>
    </Container>
  );
}
