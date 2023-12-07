import Head from 'next/head';
import { useRouter } from 'next/router';

interface Props {
  pageTitle?: string;
  pageDescription?: string;
  pageImg?: string;
  pageImgWidth?: number;
  pageImgHeight?: number;
  pageOgType?: string;
}

const Seo = ({ pageTitle, pageDescription, pageImg, pageImgWidth, pageImgHeight, pageOgType }: Props) => {
  const router = useRouter();
  const pagePath = router.asPath;
  const domain = 'https://komponents.dev1stud.io';
  const title = pageTitle;
  const defaultTitle = '콤포넌트 komponents';
  const finTitle = `${title} - ${defaultTitle}` || defaultTitle;
  const defaultDescription = 'K-components - O612의 ‘국문’으로 작성하는 컴포넌트';
  const description = pageDescription || defaultDescription;
  const url = `${domain}${pagePath}`;
  const imgUrl = `${pageImg}`;
  const imgWidth = pageImgWidth || 1280;
  const imgHeight = pageImgHeight || 630;
  const ogType = pageOgType || 'website';

  return (
    <Head>
      <title>{finTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:locale" content="ko_KR" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={finTitle} />
      <meta property="og:site_name" content={defaultTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={imgUrl} />
      <meta property="og:image:width" content={String(imgWidth)} />
      <meta property="og:image:height" content={String(imgHeight)} />
      <link rel="canonical" href={url} />
      <link rel="alternate" href={url} hrefLang="ko-KR" />
    </Head>
  );
};

export default Seo;
