FROM alpine:3.18

# Install only what is necessary for github-cli: bash, jq, github-cli, and ca-certificates
RUN apk add --no-cache \
    bash \
    jq \
    github-cli \
    ca-certificates

WORKDIR /workspace

COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
CMD ["/bin/bash"]

