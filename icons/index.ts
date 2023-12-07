type LangIcons = Record<string, any>;
type LogoIcons = { typo: any };
type MarkerIcons = { primary: any; secondary: any };
type MiscIcons = { back: any };

export const icons: { logo: LogoIcons; lang: LangIcons; marker: MarkerIcons; misc: MiscIcons } = {
  logo: {
    typo: require('./logo/typo.svg'),
  },
  lang: {
    Angular: require('./lang/angular.svg'),
    EmberJS: require('./lang/emberjs.svg'),
    GoLang: require('./lang/go.svg'),
    NextJS: require('./lang/nextjs.svg'),
    NodeJS: require('./lang/nodejs.svg'),
    Nuxt: require('./lang/nuxt.svg'),
    ReactJS: require('./lang/react.svg'),
    Svelte: require('./lang/svelte.svg'),
    TypeScript: require('./lang/ts.svg'),
    VanillaJS: require('./lang/vanillajs.svg'),
    Vue: require('./lang/vue.svg'),
  },
  marker: {
    primary: require('./marker/primary.svg'),
    secondary: require('./marker/secondary.svg'),
  },
  misc: {
    back: require('./misc/back.svg'),
  },
};
