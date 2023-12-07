import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { icons } from '@/icons';
import FormatDate from '@/components/FormatDate';
import SyntaxHighlighter from '@/components/SyntaxHighlighter';
import styles from '@/styles/Home.module.sass';

interface Article {
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

export default function Article() {
  const router = useRouter();
  const { id } = router.query;
  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/article/${id}`)
        .then((response) => response.json())
        .then((data) => setArticle(data.data.attributes));
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

  return (
    <div className={`container ${styles.articles}`}>
      {!article ? (
        <p className={styles.loading}>
          <span>코드 불러오는 중</span>
          <i />
        </p>
      ) : (
        <article>
          <h2>
            <div>
              <span lang="ko">{article.subject}</span>
              {article.subjectEng && <span lang="en">Using higher-order components</span>}
            </div>
          </h2>
          <div className={styles.summary}>
            <div className={styles.descriptions}>
              <div className={styles.date}>
                <time dateTime={article.createdAt}>{FormatDate(article.createdAt)}</time>
                <cite>@ O612</cite>
              </div>
              <div className={styles.description}>{renderDescription(article.description)}</div>
            </div>
            <div className={styles.languages}>
              <dl className="ss">
                <div>
                  <dt>언어</dt>
                  <dd>
                    <Lang langName={article.language} />
                    <span>{article.language}</span>
                  </dd>
                </div>
                <div>
                  <dt>타입스크립트 사용 여부</dt>
                  {article.useTypeScript ? (
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
                <SyntaxHighlighter code={renderCode(article.componentCode)} language={article.componentCodeLanguage} />
              </div>
              {article.componentCodeEng && (
                <div className={styles.secondary}>
                  <h4>
                    <span lang="ko">
                      <Secondary /> 영문
                    </span>
                    <span lang="en">English</span>
                  </h4>
                  <SyntaxHighlighter
                    code={renderCode(article.componentCodeEng)}
                    language={article.componentCodeLanguage}
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
                <SyntaxHighlighter code={renderCode(article.useCode)} language={article.useCodeLanguage} />
              </div>
              {article.useCodeEng && (
                <div className={styles.secondary}>
                  <h4>
                    <span lang="ko">
                      <Secondary /> 영문
                    </span>
                    <span lang="en">English</span>
                  </h4>
                  <SyntaxHighlighter code={renderCode(article.useCodeEng)} language={article.useCodeLanguage} />
                </div>
              )}
            </div>
          </div>
        </article>
      )}
    </div>
  );
}
