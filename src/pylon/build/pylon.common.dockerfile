# Copyright (c) Microsoft Corporation
# All rights reserved.
#
# MIT License
#
# Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
# documentation files (the "Software"), to deal in the Software without restriction, including without limitation
# the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
# to permit persons to whom the Software is furnished to do so, subject to the following conditions:
# The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
#
# THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
# BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
# NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
# DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

FROM ubuntu:18.04

#
# Preparation
#

WORKDIR /root/

RUN apt-get update && \
    apt-get -y install wget build-essential python python-pip git

RUN pip install jinja2

# nginx version 1.13.8
RUN wget http://nginx.org/download/nginx-1.13.8.tar.gz && \
    tar -zxf nginx-1.13.8.tar.gz

# PCRE version 4.4 - 8.40
RUN wget https://downloads.sourceforge.net/project/pcre/pcre/8.40/pcre-8.40.tar.gz && \
    tar -zxf pcre-8.40.tar.gz

# zlib version 1.1.3 - 1.2.11
RUN wget https://zlib.net/zlib-1.2.13.tar.gz && \
    tar -zxf zlib-1.2.13.tar.gz

# OpenSSL version 1.0.2 - 1.1.0
RUN wget https://www.openssl.org/source/old/1.1.0/openssl-1.1.0f.tar.gz && \
    tar -zxf openssl-1.1.0f.tar.gz

# subs_filter
RUN git clone https://github.com/yaoweibin/ngx_http_substitutions_filter_module.git

#
# Configure nginx build
#

WORKDIR /root/nginx-1.13.8

RUN ./configure \
  # Basic configurations
  --prefix=/usr/share/nginx \
  --sbin-path=/usr/sbin/nginx \
  --modules-path=/usr/lib/nginx/modules \
  --conf-path=/etc/nginx/nginx.conf \
  --error-log-path=/var/log/nginx/error.log \
  --http-log-path=/var/log/nginx/access.log \
  --user=www-data \
  --group=www-data \
  # Built-in modules
  --with-http_realip_module \
  --with-http_sub_module \
  --with-http_stub_status_module \
  --with-http_ssl_module \
  # External modules
  --with-openssl=../openssl-1.1.0f \
  --with-pcre=../pcre-8.40 \
  --with-zlib=../zlib-1.2.13 \
  --add-module=/root/ngx_http_substitutions_filter_module

#
# Make and install nginx
#

RUN make

RUN make install

#
# Prepare and start nginx
#

WORKDIR /root/

RUN ln -sf /dev/stdout /var/log/nginx/access.log

RUN ln -sf /dev/stderr /var/log/nginx/error.log

CMD ["/bin/bash"]
#
# END