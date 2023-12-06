import { images } from "@/images";
import styles from "@/styles/Home.module.sass";
import styled from "@emotion/styled";

const NextJS = styled.i({
  background: `url(${images.lang.nextjs}) no-repeat 50% 50%/contain`,
});

const Primary = styled.i({
  background: `url(${images.marker.primary}) no-repeat 50% 50%/contain`,
});

const Secondary = styled.i({
  background: `url(${images.marker.secondary}) no-repeat 50% 50%/contain`,
});

export default function Home() {
  return (
    <div className={`container ${styles.home}`}>
      <h1>
        <span lang='ko'>고차 컴포넌트 사용하기</span>
        <span lang='en'>Using higher-order components</span>
      </h1>
      <div className={styles.summary}>
        <div className={styles.description}>
          <p>Next.js + HoC Head</p>
          <div className={styles.date}>
            <time dateTime='createdAt'>createdAt</time>
            <cite>@Chloe Ariko</cite>
          </div>
        </div>
        <div className={styles.languages}>
          <dl className='ss'>
            <div>
              <dt>언어</dt>
              <dd>
                <NextJS />
                <span>Next.js</span>
              </dd>
            </div>
            <div>
              <dt>타입스크립트 사용 여부</dt>
              <dd>사용 안함</dd>
            </div>
          </dl>
        </div>
      </div>
      <div className={styles.components}>
        <div className={styles.primary}>
          <h2>
            <span lang='ko'>
              <Primary /> 컴포넌트
            </span>
            <span lang='en'>Component</span>
          </h2>
          <div className={styles.secondary}>
            <h3>
              <span lang='ko'>
                <Secondary /> 국문
              </span>
              <span lang='en'>Korean</span>
            </h3>
            <div>Code</div>
          </div>
          <div className={styles.secondary}>
            <h3>
              <span lang='ko'>
                <Secondary /> 영문
              </span>
              <span lang='en'>English</span>
            </h3>
            <div>Code</div>
          </div>
        </div>
        <div className={styles.primary}>
          <h2>
            <span lang='ko'>
              <Primary /> 사용방법
            </span>
            <span lang='en'>How to use</span>
          </h2>
          <div className={styles.secondary}>
            <h3>
              <span lang='ko'>
                <Secondary /> 국문
              </span>
              <span lang='en'>Korean</span>
            </h3>
            <div>Code</div>
          </div>
          <div className={styles.secondary}>
            <h3>
              <span lang='ko'>
                <Secondary /> 영문
              </span>
              <span lang='en'>English</span>
            </h3>
            <div>Code</div>
          </div>
        </div>
      </div>
    </div>
  );
}
