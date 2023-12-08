import type { NextApiRequest, NextApiResponse } from 'next';
import { ImageResponse } from '@vercel/og';
import { Gowun_Batang } from 'next/font/google';
import { URL } from 'url';
import { parse, URLSearchParams } from 'url';

const batang = Gowun_Batang({
  weight: ['400', '700'],
  subsets: ['vietnamese'],
});

export const config = {
  runtime: 'edge',
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!req.url) {
    return res.status(400).send('Invalid request');
  }
  const parsedUrl = parse(req.url, true);
  const queryObject = parsedUrl.query;

  let numericValue = null;
  for (const [key, value] of Object.entries(queryObject)) {
    if (value !== '') {
      const potentialNumber = Number(value);
      if (!isNaN(potentialNumber)) {
        numericValue = potentialNumber;
        break;
      }
    }
  }

  const response = await fetch(`${process.env.STRAPI_URL}/${numericValue}`, {
    headers: {
      Authorization: `Bearer ${process.env.STRAPI_BEARER_TOKEN}`,
    },
  });
  const articleData = await response.json();
  return new ImageResponse(
    (
      <div
        style={{
          backgroundColor: '#ffffff',
          backgroundImage:
            'radial-gradient(circle at 25px 25px, lightgray 2%, transparent 0%), radial-gradient(circle at 75px 75px, lightgray 2%, transparent 0%)',
          backgroundSize: '100px 100px',
          alignContent: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          position: 'relative',
          display: 'flex',
          width: '100%',
          height: '100%',
          textAlign: 'center',
          fontSize: '52px',
          lineHeight: 1,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt="Komponent"
          width={367}
          height={87}
          src="data:image/svg+xml,%3Csvg width='368' height='88' viewBox='0 0 368 88' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg clip-path='url(%23clip0_3968_2409)'%3E%3Cpath d='M21.9785 34.6528L21.3494 33.0351L20.5405 34.6528L13.4403 43.9999C12.901 42.8016 12.6314 41.3336 12.6314 39.596C12.6314 37.8284 12.916 36.001 13.4852 34.1136C14.0544 32.2262 14.9382 30.4586 16.1366 28.8109L37.0776 0.5H46.7842L26.4723 26.9235L49.615 65.6934L33.3216 54.6035L30.6965 50.2463L21.9785 34.6528Z' fill='%23DA3832'/%3E%3Cpath d='M0.138672 65.8397V0.5H8.67688V65.8397H0.138672Z' fill='%23000039'/%3E%3Cpath d='M52.371 65.8401C48.3566 65.8401 44.7016 64.9249 41.4062 63.0946C38.1407 61.2642 35.5343 58.5777 33.587 55.0352C31.6696 51.4926 30.7109 47.1529 30.7109 42.0161C30.7109 37.9717 31.3251 34.4586 32.5534 31.4769C33.8116 28.4952 35.4744 26.0302 37.5415 24.0818C39.6386 22.1333 41.9754 20.6868 44.5518 19.7421C47.1283 18.7679 49.7347 18.2808 52.371 18.2808C56.9547 18.2808 60.8643 19.3435 64.0998 21.4691C67.3353 23.5651 69.7919 26.414 71.4696 30.0156C73.1773 33.5877 74.0311 37.5879 74.0311 42.0161C74.0311 45.8539 73.4469 49.2637 72.2785 52.2454C71.1401 55.1975 69.5673 57.6921 67.56 59.7291C65.5528 61.7366 63.246 63.2569 60.6396 64.2902C58.0332 65.3234 55.277 65.8401 52.371 65.8401ZM52.371 59.4634C55.277 59.4634 57.6737 58.6663 59.5611 57.0721C61.4485 55.478 62.8415 53.3672 63.7403 50.7398C64.669 48.0828 65.1334 45.1749 65.1334 42.0161C65.1334 38.0602 64.5342 34.7981 63.3359 32.2297C62.1675 29.6613 60.6096 27.7572 58.6623 26.5173C56.745 25.2774 54.6479 24.6574 52.371 24.6574C50.0942 24.6574 47.9821 25.2774 46.0348 26.5173C44.1174 27.7572 42.5596 29.6613 41.3612 32.2297C40.1928 34.7981 39.6086 38.0602 39.6086 42.0161C39.6086 47.1529 40.7171 51.345 42.9341 54.5923C45.151 57.8397 48.2966 59.4634 52.371 59.4634Z' fill='%23DA3832'/%3E%3Cpath d='M358.518 65.84C353.634 65.84 349.875 64.2372 347.238 61.0316C344.632 57.826 343.329 53.3772 343.329 47.685V24.5869V22.1377V6.52189L351.238 4.00537V48.6737C351.238 51.7594 351.897 54.3508 353.215 56.4479C354.563 58.5151 356.331 59.5486 358.518 59.5486C359.686 59.5486 360.809 59.4438 361.888 59.2341C362.996 59.0244 364.33 58.6798 365.888 58.2005L367.865 63.8627C365.588 64.6117 363.82 65.1209 362.562 65.3906C361.304 65.6902 359.956 65.84 358.518 65.84ZM362.023 24.5869C360.615 24.5869 359.416 24.3173 358.428 23.7781C357.469 23.2088 356.66 22.4599 356.001 21.5312C355.372 20.5725 354.863 19.5239 354.473 18.3855H367.146V24.5869H362.023Z' fill='%23221F20'/%3E%3Cpath d='M343.347 32.0468C343.347 29.9797 342.113 28.287 341.184 26.9689C340.256 25.6207 338.863 24.9466 337.005 24.9466C336.286 24.9466 335.657 25.0215 335.118 25.1713C334.578 25.3211 333.919 25.4859 333.14 25.6657C331.403 26.0551 329.785 26.0701 328.287 25.7106C326.789 25.3511 325.411 24.5272 324.153 23.239C327.358 21.3516 330.025 20.0934 332.152 19.4642C334.309 18.8051 336.196 18.4756 337.814 18.4756C340.211 18.4756 342.428 18.91 344.465 19.7788C346.502 20.6476 348.135 22.1305 349.363 24.2276C350.591 26.3247 351.206 28.332 351.206 32.0468H343.347ZM313.098 65.8402V30.6987C313.098 29.021 312.993 27.2385 312.784 25.3511C312.604 23.4637 312.259 21.4714 311.75 19.3743H318.221C319.659 20.9921 320.603 22.5949 321.052 24.1827C321.502 25.7705 321.726 27.4632 321.726 29.2607V65.8402H313.098Z' fill='%23221F20'/%3E%3Cpath d='M293.971 66.7389C290.675 66.7389 287.679 66.1248 284.983 64.8965C282.317 63.6682 280.025 61.9605 278.108 59.7735C276.22 57.5566 274.767 54.9652 273.749 51.9993C272.73 49.0034 272.221 45.7379 272.221 42.2028C272.221 37.3495 273.104 33.1553 274.872 29.6202C276.67 26.0551 279.216 23.3139 282.511 21.3966C285.807 19.4492 289.717 18.4756 294.24 18.4756C297.326 18.4756 300.052 19.1646 302.419 20.5427C304.786 21.8909 306.688 23.7483 308.126 26.115C309.594 28.4518 310.493 31.1181 310.822 34.114C311.182 37.0799 310.867 40.1656 309.879 43.3712H283.815C284.444 41.6636 285.328 40.2405 286.466 39.1021C287.634 37.9337 289.297 37.3495 291.454 37.3495H302.868C303.138 35.0427 302.868 32.9606 302.059 31.1031C301.281 29.2157 300.112 27.7178 298.554 26.6094C297.026 25.5009 295.289 24.9466 293.342 24.9466C290.825 24.9466 288.608 25.6207 286.691 26.9689C284.773 28.317 283.275 30.2943 282.197 32.9007C281.118 35.4771 280.579 38.6078 280.579 42.2927C280.579 45.8578 281.193 48.9884 282.422 51.6847C283.68 54.381 285.387 56.4931 287.545 58.021C289.702 59.5189 292.143 60.2679 294.869 60.2679C296.937 60.2679 298.899 60.0581 300.756 59.6387C302.614 59.1893 304.816 58.3205 307.362 57.0323L309.609 62.9641C306.733 64.4321 303.947 65.4207 301.251 65.93C298.554 66.4693 296.128 66.7389 293.971 66.7389Z' fill='%23221F20'/%3E%3Cpath d='M259.847 65.8402V32.0468C259.847 29.9797 259.383 28.287 258.454 26.9689C257.525 25.6207 256.132 24.9466 254.275 24.9466C253.556 24.9466 252.927 25.0215 252.387 25.1713C251.848 25.3211 251.189 25.4859 250.41 25.6657C248.672 26.0551 247.055 26.0701 245.557 25.7106C244.059 25.3511 242.681 24.5272 241.422 23.239C244.628 21.3516 247.294 20.0934 249.421 19.4642C251.578 18.8051 253.466 18.4756 255.084 18.4756C257.48 18.4756 259.697 18.91 261.734 19.7788C263.772 20.6476 265.404 22.1305 266.633 24.2276C267.861 26.3247 268.475 29.2307 268.475 32.9456V65.8402H259.847ZM230.368 65.8402V30.6987C230.368 29.021 230.263 27.2385 230.053 25.3511C229.873 23.4637 229.529 21.4714 229.02 19.3743H235.491C236.929 20.9921 237.872 22.5949 238.322 24.1827C238.771 25.7705 238.996 27.4632 238.996 29.2607V65.8402H230.368Z' fill='%23221F20'/%3E%3Cpath d='M203.613 66.7389C199.599 66.7389 195.944 65.8102 192.648 63.9528C189.383 62.0953 186.776 59.3691 184.829 55.7741C182.912 52.179 181.953 47.7751 181.953 42.5623C181.953 38.458 182.567 34.8929 183.796 31.8671C185.054 28.8413 186.717 26.3397 188.784 24.3625C190.881 22.3852 193.218 20.9172 195.794 19.9585C198.37 18.9699 200.977 18.4756 203.613 18.4756C208.197 18.4756 212.106 19.5541 215.342 21.7111C218.578 23.8382 221.034 26.7292 222.712 30.3841C224.419 34.0091 225.273 38.0685 225.273 42.5623C225.273 46.4569 224.689 49.9172 223.521 52.943C222.382 55.9388 220.809 58.4703 218.802 60.5375C216.795 62.5747 214.488 64.1175 211.882 65.1661C209.275 66.2146 206.519 66.7389 203.613 66.7389ZM203.613 60.2679C206.519 60.2679 208.916 59.459 210.803 57.8412C212.691 56.2234 214.084 54.0814 214.982 51.4151C215.911 48.7188 216.376 45.7679 216.376 42.5623C216.376 38.5479 215.776 35.2374 214.578 32.631C213.41 30.0246 211.852 28.0923 209.905 26.834C207.987 25.5758 205.89 24.9466 203.613 24.9466C201.336 24.9466 199.224 25.5758 197.277 26.834C195.36 28.0923 193.802 30.0246 192.603 32.631C191.435 35.2374 190.851 38.5479 190.851 42.5623C190.851 47.7751 191.959 52.0292 194.176 55.3247C196.393 58.6201 199.539 60.2679 203.613 60.2679Z' fill='%23221F20'/%3E%3Cpath d='M136.915 87.5002V34.7431C136.915 31.1481 136.894 28.0773 136.595 25.5308C136.295 22.9844 135.926 20.3739 135.566 18.8161C136.235 18.8161 143.021 20.6626 143.47 21.3516C143.95 22.0407 144.384 22.9993 144.773 24.2276L144.953 25.6657L145.672 24.0479C147.56 21.9807 149.702 20.5427 152.098 19.7338C154.495 18.895 156.637 18.4756 158.524 18.4756C162.719 18.4756 166.284 19.5541 169.22 21.7111C172.156 23.8382 174.387 26.7442 175.915 30.4291C177.443 34.114 178.207 38.2483 178.207 42.8319C178.207 46.427 177.638 49.6775 176.5 52.5835C175.361 55.4595 173.803 57.9311 171.826 59.9982C169.849 62.0654 167.617 63.6532 165.13 64.7616C162.644 65.8402 160.052 66.3794 157.356 66.3794C156.008 66.3794 154.57 66.2596 153.042 66.0199C151.544 65.8102 149.986 65.4207 148.368 64.8515C149.237 63.3536 150.346 62.1403 151.694 61.2116C153.042 60.2828 154.75 59.8484 156.817 59.9084C158.884 59.9683 160.876 59.414 162.793 58.2457C164.711 57.0773 166.269 55.2348 167.467 52.7183C168.695 50.1718 169.309 46.8764 169.309 42.8319C169.309 39.3567 168.845 36.271 167.916 33.5747C166.988 30.8785 165.61 28.7664 163.782 27.2385C161.985 25.7106 159.753 24.9466 157.086 24.9466C155.079 24.9466 153.072 25.4859 151.065 26.5644C149.087 27.613 147.536 29.2607 145.678 31.5076V87.5002H136.915Z' fill='%23221F20'/%3E%3Cpath d='M136.916 65.8402V32.0468C136.916 29.9797 136.451 28.287 135.523 26.9689C134.624 25.6207 133.231 24.9466 131.343 24.9466C130.624 24.9466 129.95 25.0215 129.321 25.1713C128.722 25.3211 128.018 25.4859 127.209 25.6657C125.471 26.0551 123.854 26.0701 122.356 25.7106C120.858 25.3511 119.48 24.5272 118.221 23.239C121.427 21.3516 124.153 20.0934 126.4 19.4642C128.677 18.8051 130.624 18.4756 132.242 18.4756C134.609 18.4756 136.796 18.91 138.803 19.7788C140.84 20.6476 142.473 22.1305 143.701 24.2276C144.93 26.3247 145.544 29.2307 145.544 32.9456V65.8402H136.916ZM79.1255 65.8402V30.6987C79.1255 29.021 79.0206 27.2385 78.8109 25.3511C78.6312 23.4637 78.2866 21.4714 77.7773 19.3743H84.2484C85.6864 20.9921 86.6301 22.5949 87.0795 24.1827C87.5289 25.7705 87.7536 27.4632 87.7536 29.2607V65.8402H79.1255ZM108.066 65.8402V32.0468C108.066 29.9797 107.631 28.287 106.762 26.9689C105.923 25.6207 104.62 24.9466 102.853 24.9466C102.134 24.9466 101.505 25.0066 100.965 25.1264C100.426 25.2462 99.767 25.396 98.988 25.5758C97.2504 25.9652 95.6626 25.9802 94.2246 25.6207C92.7866 25.2612 91.4385 24.4374 90.1802 23.1491C93.3858 21.2617 96.0521 20.0185 98.1792 19.4193C100.336 18.7902 102.224 18.4756 103.841 18.4756C106.178 18.4756 108.32 18.91 110.267 19.7788C112.215 20.6476 113.773 22.1305 114.941 24.2276C116.109 26.3247 116.694 29.2307 116.694 32.9456V65.8402H108.066Z' fill='%23221F20'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0_3968_2409'%3E%3Crect width='367.726' height='87' fill='white' transform='translate(0.138672 0.5)'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E%0A"
          style={{ margin: '0 75px 50px' }}
        />
        <span style={{ color: '#DA3832' }}>{articleData.data.attributes.subject}</span>
        {articleData.data.attributes.subjectEng && (
          <span style={{ fontSize: '37px', color: '#9DA19B' }}>{articleData.data.attributes.subjectEng}</span>
        )}
        <p
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            margin: 0,
            padding: '15px',
            backgroundColor: '#DA3832',
            color: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
            fontSize: '32px',
          }}
        >
          {articleData.data.attributes.description.split('\n').map((line: any, index: number) => (
            <span key={index}>{line}</span>
          ))}
        </p>
      </div>
    ),
    {
      width: 1200,
      height: 600,
    },
  );
}
