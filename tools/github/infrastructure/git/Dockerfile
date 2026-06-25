FROM alpine:3.18

# Install only what is necessary for git command line: git, bash, openssh-client, and ca-certificates
RUN apk add --no-cache \
    git \
    bash \
    openssh-client \
    ca-certificates

WORKDIR /workspace

# Set default entrypoint to run bash
ENTRYPOINT ["/bin/bash"]

