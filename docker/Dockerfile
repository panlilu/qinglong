FROM python:3.11-alpine

ARG QL_MAINTAINER="panlilu"
LABEL maintainer="${QL_MAINTAINER}"
ARG QL_URL=https://github.com/${QL_MAINTAINER}/qinglong.git
ARG QL_BRANCH=develop

ENV PNPM_HOME=/root/.local/share/pnpm \
  PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/root/.local/share/pnpm:/root/.local/share/pnpm/global/5/node_modules:$PNPM_HOME \
  NODE_PATH=/usr/local/bin:/usr/local/pnpm-global/5/node_modules:/usr/local/lib/node_modules:/root/.local/share/pnpm/global/5/node_modules \
  LANG=C.UTF-8 \
  SHELL=/bin/bash \
  PS1="\u@\h:\w \$ " \
  QL_DIR=/ql \
  QL_BRANCH=${QL_BRANCH}

RUN set -x \
  && apk update -f \
  && apk upgrade \
  && apk --no-cache add -f bash \
  coreutils \
  git \
  curl \
  wget \
  tzdata \
  perl \
  openssl \
  nginx \
  nodejs \
  jq \
  openssh \
  procps \
  npm \
  && rm -rf /var/cache/apk/* \
  && apk update \
  && ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
  && echo "Asia/Shanghai" > /etc/timezone \
  && git config --global user.email "qinglong@@users.noreply.github.com" \
  && git config --global user.name "qinglong" \
  && git config --global http.postBuffer 524288000 \
  && npm install -g pnpm@8.3.1 pm2 tsx \
  && rm -rf /root/.pnpm-store \
  && rm -rf /root/.local/share/pnpm/store \
  && rm -rf /root/.cache \
  && rm -rf /root/.npm


ARG SOURCE_COMMIT
COPY ./. /ql

RUN cd ${QL_DIR} \
  && cp -f .env.example .env \
  && chmod 777 ${QL_DIR}/shell/*.sh \
  && chmod 777 ${QL_DIR}/docker/*.sh

WORKDIR ${QL_DIR}

HEALTHCHECK --interval=5s --timeout=2s --retries=20 \
  CMD curl -sf http://127.0.0.1:5400/api/health || exit 1

ENTRYPOINT ["./docker/docker-entrypoint.sh"]
