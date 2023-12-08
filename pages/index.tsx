import { useEffect, useState } from 'react';
import type { GetServerSideProps, NextPage } from 'next';
import styled from '@emotion/styled';
import { icons } from '@/icons';
import Seo from '@/components/Seo';
import Anchor from '@/components/Anchor';
import FormatDate from '@/components/FormatDate';
import SyntaxHighlighter from '@/components/SyntaxHighlighter';
import styles from '@/styles/Home.module.sass';

interface Komponent {
  id: number;
  langName: string;
  attributes: {
    subject: string;
    subjectEng?: string;
    description: string;
    componentCodeLanguage: string;
    componentCode: any[];
    componentCodeEng?: any[];
    useCodeLanguage: string;
    useCode: any[];
    useCodeEng?: any[];
    language: string;
    useTypeScript: boolean;
    createdAt: string;
  };
}

interface HomeProps {
  komponents: Komponent[];
}

const Lang = styled.i<{ langName?: string }>((props) => {
  const { langName } = props;
  return {
    background: langName && `url(${icons.lang[langName]}) no-repeat 50% 50%/contain`,
  };
});

const UseTypeScript = styled.i({
  background: `url(${icons.lang.TypeScript}) no-repeat 50% 50%/contain`,
});

const Primary = styled.i({
  background: `url(${icons.marker.primary}) no-repeat 50% 50%/contain`,
});

const Secondary = styled.i({
  background: `url(${icons.marker.secondary}) no-repeat 50% 50%/contain`,
});

const Home: NextPage<HomeProps> = ({ komponents }) => {
  const [sortedKomponents, setSortedKomponents] = useState<Komponent[]>([]);
  useEffect(() => {
    const sortedData = komponents.sort((a, b) => b.id - a.id);
    setSortedKomponents(sortedData);
  }, [komponents]);

  const renderCode = (codeBlocks: any[]) =>
    codeBlocks.map((block) => block.children.map((child: any) => child.text).join('\n')).join('\n');
  const renderDescription = (description: string) => {
    return description.split('\n').map((line, index) => {
      if (index % 2 === 0) {
        return (
          <p key={index} lang="ko">
            {line}
          </p>
        );
      } else {
        return (
          <p key={index} lang="en">
            {line}
          </p>
        );
      }
    });
  };

  const timestamp = Date.now();

  return (
    <div className={`container ${styles.articles}`}>
      <Seo pageImg={`https://komponent.dev1stud.io/og-image.webp?ts=${timestamp}`} />
      {sortedKomponents.map((komp) => (
        <article key={komp.id}>
          <h2>
            <Anchor href={`/article/${komp.id}`} scroll={false} shallow={true}>
              <span lang="ko">{komp.attributes.subject}</span>
              {komp.attributes.subjectEng && <span lang="en">{komp.attributes.subjectEng}</span>}
            </Anchor>
          </h2>
          <div className={styles.summary}>
            <div className={styles.descriptions}>
              <div className={styles.date}>
                <time dateTime={komp.attributes.createdAt}>{FormatDate(komp.attributes.createdAt)}</time>
                <cite>@ O612</cite>
              </div>
              <div className={styles.description}>{renderDescription(komp.attributes.description)}</div>
            </div>
            <div className={styles.languages}>
              <dl className="ss">
                <div>
                  <dt>언어</dt>
                  <dd>
                    <Lang langName={komp.attributes.language} />
                    <span>{komp.attributes.language}</span>
                  </dd>
                </div>
                <div>
                  <dt>타입스크립트 사용 여부</dt>
                  {komp.attributes.useTypeScript ? (
                    <dd className={styles.useTypeScript}>
                      <UseTypeScript />
                      <em aria-disabled>TypeScript</em>
                      <span>사용함</span>
                    </dd>
                  ) : (
                    <dd className={styles.noTS}>사용 안함</dd>
                  )}
                </div>
              </dl>
            </div>
          </div>
          <div className={styles.components}>
            <div className={styles.primary}>
              <h3>
                <span lang="ko">
                  <Primary /> 컴포넌트
                </span>
                <span lang="en">Component</span>
              </h3>
              <div className={styles.secondary}>
                <h4>
                  <span lang="ko">
                    <Secondary /> 국문
                  </span>
                  <span lang="en">Korean</span>
                </h4>
                <SyntaxHighlighter
                  code={renderCode(komp.attributes.componentCode)}
                  language={komp.attributes.componentCodeLanguage}
                />
              </div>
              {komp.attributes.componentCodeEng && (
                <div className={styles.secondary}>
                  <h4>
                    <span lang="ko">
                      <Secondary /> 영문
                    </span>
                    <span lang="en">English</span>
                  </h4>
                  <SyntaxHighlighter
                    code={renderCode(komp.attributes.componentCodeEng)}
                    language={komp.attributes.componentCodeLanguage}
                  />
                </div>
              )}
            </div>
            <div className={styles.primary}>
              <h3>
                <span lang="ko">
                  <Primary /> 사용방법
                </span>
                <span lang="en">How to use</span>
              </h3>
              <div className={styles.secondary}>
                <h4>
                  <span lang="ko">
                    <Secondary /> 국문
                  </span>
                  <span lang="en">Korean</span>
                </h4>
                <SyntaxHighlighter
                  code={renderCode(komp.attributes.useCode)}
                  language={komp.attributes.useCodeLanguage}
                />
              </div>
              {komp.attributes.useCodeEng && (
                <div className={styles.secondary}>
                  <h4>
                    <span lang="ko">
                      <Secondary /> 영문
                    </span>
                    <span lang="en">English</span>
                  </h4>
                  <SyntaxHighlighter
                    code={renderCode(komp.attributes.useCodeEng)}
                    language={komp.attributes.useCodeLanguage}
                  />
                </div>
              )}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/komponents`);
  const data = await response.json();

  return {
    props: { komponents: data.data },
  };
};

export default Home;
