declare module '*.svg' {
  import * as React from 'react';

  export const ReactComponent: React.FunctionComponent<React.SVGProps<
    SVGSVGElement
  > & { title?: string }>;

  const src: string;
  export default src;
}

declare module "*.jpg" {
  const value: any;
  export default value;
}

declare module "*.png" {
  const value: any;
  export default value;
}

declare module "*.py" {
  const value: any;
  export default value;
}
