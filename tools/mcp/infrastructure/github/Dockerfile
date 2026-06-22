FROM alpine:3.18

# Copy Go binary from official image
COPY --from=ghcr.io/github/github-mcp-server:latest /server/github-mcp-server /server/github-mcp-server

# Install socat
RUN apk add --no-cache socat

EXPOSE 3001
ENTRYPOINT ["socat", "TCP-LISTEN:3001,reuseaddr,fork", "EXEC:\"/server/github-mcp-server stdio\""]