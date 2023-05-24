FROM python:3.9
MAINTAINER Benjamin Renard <brenard@zionetrix.net>

RUN apt-get update && apt-get install --no-install-recommends -y supervisor redis-server ffmpeg && apt-get clean && rm -rf /var/lib/apt/lists/*

ADD requirements.txt /app/
RUN pip install -r /app/requirements.txt

ADD static /app/static
ADD templates /app/templates
ADD app.py /app/

# Supervisor
ADD supervisord/conf.d/* /etc/supervisor/conf.d/
ADD supervisord/supervisord.conf /etc/supervisor/supervisord.conf
RUN mkdir -p /var/log/yt-dlp-web /var/log/redis

RUN mkdir /downloads
RUN chmod 777 /downloads

EXPOSE 5000

CMD ["/usr/bin/supervisord"]
