import { rspack } from '@rspack/core';

export default (config) => ({
  ...config,

  optimization: {
    ...config.optimization,

    minimize: process.env.NODE_ENV === 'production',

    minimizer: [
      new rspack.SwcJsMinimizerRspackPlugin({
        minimizerOptions: {
          compress: {
            keep_classnames: true,
            keep_fnames: true,
          },
          mangle: {
            keep_classnames: true,
            keep_fnames: true,
          },
        },
      }),
    ],
  },
});