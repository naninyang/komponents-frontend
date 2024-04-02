import { useEffect } from 'react';
import type { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { icons } from '@/icons';
import Seo from '@/components/Seo';
import Anchor from '@/components/Anchor';
import FormatDate from '@/components/FormatDate';
import styles from '@/styles/Home.module.sass';
import { Pagination } from '@/components/Pagination';

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

function Home({ komponents, currentPage, pageCount }: { komponents: any; currentPage: number; pageCount: number }) {
  const router = useRouter();

  useEffect(() => {
    localStorage.removeItem('currentPage');
  }, []);

  useEffect(() => {
    sessionStorage.setItem('location', router.asPath);
  }, [router.asPath]);

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
    <div className={`container ${styles.container}`}>
      <Seo pageImg={`https://komponent.dev1stud.io/og-image.webp?ts=${timestamp}`} />
      {Array.isArray(komponents) && (
        <>
          <ul className={styles.komponents}>
            {komponents.map((komponent) => (
              <li key={komponent.id}>
                <Anchor href={`/article/${komponent.id}`} scroll={false} shallow={true}>
                  <div className={styles.subject}>
                    <span lang="ko">{komponent.attributes.subject}</span>
                    {komponent.attributes.subjectEng && <span lang="en">{komponent.attributes.subjectEng}</span>}
                  </div>
                  <div className={styles.summary}>
                    <div className={styles.languages}>
                      <dl className="ss">
                        <div>
                          <dt>언어</dt>
                          <dd>
                            <Lang langName={komponent.attributes.language} />
                            <span>{komponent.attributes.language}</span>
                          </dd>
                        </div>
                        <div>
                          <dt>타입스크립트 사용 여부</dt>
                          {komponent.attributes.useTypeScript ? (
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
                    <div className={styles.description}>{renderDescription(komponent.attributes.description)}</div>
                    <div className={styles.date}>
                      <time dateTime={komponent.attributes.createdAt}>
                        {FormatDate(komponent.attributes.createdAt)}
                      </time>
                      <cite>O612</cite>
                    </div>
                  </div>
                </Anchor>
              </li>
            ))}
          </ul>
          <Pagination currentPage={currentPage} pageCount={pageCount} />
        </>
      )}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const currentPage = Number(context.query.page) || 1;
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/komponents?page=${currentPage}`);
  const responseData = await response.json();
  const komponentsData = responseData.data;
  const komponents = komponentsData.data;
  const pageCount = komponentsData.meta.pagination.pageCount;

  return {
    props: { komponents, currentPage, pageCount },
  };
};

export default Home;
