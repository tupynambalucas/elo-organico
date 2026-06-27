FROM alpine:3.18

# Install only what is necessary for github-cli: bash, jq, github-cli, and ca-certificates
RUN apk add --no-cache \
    bash \
    jq \
    github-cli \
    ca-certificates

WORKDIR /workspace

# Set default entrypoint to run bash
ENTRYPOINT ["/bin/bash"]

