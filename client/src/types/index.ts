import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type Name = {
  ID: number;
  Name: string;
  Address: string;
  River: string;
  Latitude: number;
  Longitude: number;
};

export type Ships = {
  ID: number;
  Coordinates: [number, number];
};