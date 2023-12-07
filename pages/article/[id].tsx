import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { icons } from '@/icons';
import Seo from '@/components/Seo';
import FormatDate from '@/components/FormatDate';
import SyntaxHighlighter from '@/components/SyntaxHighlighter';
import Anchor from '@/components/Anchor';
import styles from '@/styles/Home.module.sass';

interface Article {
  id: number;
  attributes: {
    langName: string;
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

const Backward = styled.i({
  background: `url(${icons.misc.back}) no-repeat 50% 50%/contain`,
});

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

export default function Article() {
  const router = useRouter();
  const { id } = router.query;
  const [article, setArticle] = useState<Article | null>(null);
  const [scrollPosition, setScrollPosition] = useState<string | null>(null);

  useEffect(() => {
    const savedPosition = sessionStorage.getItem('scrollPosition_' + router.asPath);
    setScrollPosition(savedPosition);
  }, [router.asPath]);

  let savedScrollPosition;

  const handleBackwardClick = () => {
    const savedScrollPosition = sessionStorage.getItem('scrollPosition_' + router.asPath);
    if (savedScrollPosition) {
      router.back();
    }
  };

  useEffect(() => {
    if (id) {
      fetch(`/api/article/${id}`)
        .then((response) => response.json())
        .then((data) => setArticle(data.data));
    }
  }, [id]);

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

  const commentsElement = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const scriptElement = document.createElement('script');
    scriptElement.async = true;
    scriptElement.src = 'https://utteranc.es/client.js';
    scriptElement.setAttribute('repo', 'naninyang/komponents-frontend');
    scriptElement.setAttribute('issue-term', 'pathname');
    scriptElement.setAttribute('theme', 'github-light');
    scriptElement.setAttribute('crossorigin', 'anonymous');
    commentsElement.current?.appendChild(scriptElement);
  }, []);

  const timestamp = Date.now();

  return (
    <div className={`container ${styles.articles}`}>
      {!article ? (
        <p className={styles.loading}>
          <span>코드 불러오는 중</span>
          <i />
        </p>
      ) : (
        <>
          <Seo
            pageTitle={`${article.attributes.subject} ${
              article.attributes.subjectEng && article.attributes.subjectEng
            }`}
            pageDescription={`${article.attributes.description}`}
            pageImg={`https://komponent.dev1stud.io/og-image.webp?ts=${timestamp}`}
          />
          {scrollPosition ? (
            <button onClick={handleBackwardClick} className={styles.backword}>
              <Backward />
              <span className="ss">뒤로가기.back</span>
            </button>
          ) : (
            <Anchor href="/" className={styles.backword}>
              <Backward />
              <span className="ss">뒤로가기.back</span>
            </Anchor>
          )}
          <article>
            <h2>
              <div>
                <span lang="ko">{article.attributes.subject}</span>
                {article.attributes.subjectEng && <span lang="en">{article.attributes.subjectEng}</span>}
              </div>
            </h2>
            <div className={styles.summary}>
              <div className={styles.descriptions}>
                <div className={styles.date}>
                  <time dateTime={article.attributes.createdAt}>{FormatDate(article.attributes.createdAt)}</time>
                  <cite>@ O612</cite>
                </div>
                <div className={styles.description}>{renderDescription(article.attributes.description)}</div>
              </div>
              <div className={styles.languages}>
                <dl className="ss">
                  <div>
                    <dt>언어</dt>
                    <dd>
                      <Lang langName={article.attributes.language} />
                      <span>{article.attributes.language}</span>
                    </dd>
                  </div>
                  <div>
                    <dt>타입스크립트 사용 여부</dt>
                    {article.attributes.useTypeScript ? (
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
                    code={renderCode(article.attributes.componentCode)}
                    language={article.attributes.componentCodeLanguage}
                  />
                </div>
                {article.attributes.componentCodeEng && (
                  <div className={styles.secondary}>
                    <h4>
                      <span lang="ko">
                        <Secondary /> 영문
                      </span>
                      <span lang="en">English</span>
                    </h4>
                    <SyntaxHighlighter
                      code={renderCode(article.attributes.componentCodeEng)}
                      language={article.attributes.componentCodeLanguage}
                    />
                  </div>
                )}
              </div>
              <div className={styles.primary}>
                <h2>
                  <span lang="ko">
                    <Primary /> 사용방법
                  </span>
                  <span lang="en">How to use</span>
                </h2>
                <div className={styles.secondary}>
                  <h4>
                    <span lang="ko">
                      <Secondary /> 국문
                    </span>
                    <span lang="en">Korean</span>
                  </h4>
                  <SyntaxHighlighter
                    code={renderCode(article.attributes.useCode)}
                    language={article.attributes.useCodeLanguage}
                  />
                </div>
                {article.attributes.useCodeEng && (
                  <div className={styles.secondary}>
                    <h4>
                      <span lang="ko">
                        <Secondary /> 영문
                      </span>
                      <span lang="en">English</span>
                    </h4>
                    <SyntaxHighlighter
                      code={renderCode(article.attributes.useCodeEng)}
                      language={article.attributes.useCodeLanguage}
                    />
                  </div>
                )}
              </div>
            </div>
          </article>
          {scrollPosition ? (
            <button onClick={handleBackwardClick} className={styles.return}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M10.0003 5.3418C9.74441 5.3418 9.48825 5.44122 9.29325 5.63672L3.637 11.293C3.246 11.684 3.246 12.317 3.637 12.707L9.29325 18.3633C9.68425 18.7543 10.3173 18.7543 10.7073 18.3633L10.7933 18.2773C11.1843 17.8863 11.1843 17.2533 10.7933 16.8633L6.92997 13H20.0003C20.5523 13 21.0003 12.552 21.0003 12C21.0003 11.448 20.5523 11 20.0003 11H6.92997L10.7933 7.13672C11.1843 6.74572 11.1843 6.11266 10.7933 5.72266L10.7073 5.63672C10.5118 5.44122 10.2562 5.3418 10.0003 5.3418Z"
                  fill="black"
                />
              </svg>
              <span className="ss">뒤로가기.back</span>
            </button>
          ) : (
            <Anchor href="/" className={styles.return}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M10.0003 5.3418C9.74441 5.3418 9.48825 5.44122 9.29325 5.63672L3.637 11.293C3.246 11.684 3.246 12.317 3.637 12.707L9.29325 18.3633C9.68425 18.7543 10.3173 18.7543 10.7073 18.3633L10.7933 18.2773C11.1843 17.8863 11.1843 17.2533 10.7933 16.8633L6.92997 13H20.0003C20.5523 13 21.0003 12.552 21.0003 12C21.0003 11.448 20.5523 11 20.0003 11H6.92997L10.7933 7.13672C11.1843 6.74572 11.1843 6.11266 10.7933 5.72266L10.7073 5.63672C10.5118 5.44122 10.2562 5.3418 10.0003 5.3418Z"
                  fill="black"
                />
              </svg>
              <span className="ss">뒤로가기.back</span>
            </Anchor>
          )}
          <div ref={commentsElement} />
        </>
      )}
    </div>
  );
}
