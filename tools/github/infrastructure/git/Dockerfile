FROM alpine:3.18

# Install necessary tools for git command line, including git-flow (AVH Edition)
RUN apk add --no-cache \
    git \
    git-flow \
    bash \
    openssh-client \
    ca-certificates

WORKDIR /workspace

# Set default entrypoint to run bash
ENTRYPOINT ["/bin/bash"]

