export enum HomeRouteNames {
  Home = 'Home',
  Hero = 'Hero',
}

export type HeroParams = {
  query: string;
};

export type HomeStackParams = {
  [HomeRouteNames.Home]: undefined;
  [HomeRouteNames.Hero]: HeroParams;
};
