import styled from '@emotion/styled';
import Anchor from './Anchor';
import { rem, funcMixIn } from '@/styles/designSystem';
import { icons } from '@/icons';

const Container = styled.header({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: `0 ${rem(25)}`,
  height: rem(52),
  '& .header': {
    display: 'flex',
    '& h1, & a': {
      display: 'block',
      width: rem(105),
      height: rem(25),
    },
    '& h1': {
      '& span': {
        ...funcMixIn.screenReaderOnly,
      },
      '& i': {
        display: 'block',
        width: rem(105),
        height: rem(25),
      },
    },
  },
});

const Koponents = styled.i({
  background: `url(${icons.logo.typo}) no-repeat 50% 50%/contain`,
});

export default function Header() {
  return (
    <Container>
      <div className="header container">
        <h1>
          <Anchor href="/">
            <span>komponents</span>
            <Koponents />
          </Anchor>
        </h1>
      </div>
    </Container>
  );
}
