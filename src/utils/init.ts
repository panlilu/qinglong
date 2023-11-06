import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import { loader } from '@monaco-editor/react';

export function init(version: string) {
  // monaco 编辑器配置cdn和locale
  loader.config({
    paths: {
      vs: 'https://cdn.staticfile.org/monaco-editor/0.33.0/min/vs',
    },
    'vs/nls': {
      availableLanguages: {
        '*': 'zh-cn',
      },
    },
  });
}
