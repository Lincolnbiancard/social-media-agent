FROM node:22-slim

WORKDIR /app

# Install dependencies for native modules
RUN apt-get update && apt-get install -y \
    python3 \
        make \
            g++ \
                && rm -rf /var/lib/apt/lists/*

                # Copy package files
                COPY package.json yarn.lock ./

                # Install dependencies
                RUN yarn install --ignore-engines --frozen-lockfile

                # Copy source code
                COPY . .

                # Build TypeScript
                RUN yarn build

                # Expose port
                EXPOSE ${PORT:-8123}

                # Start the LangGraph server
                CMD ["sh", "-c", "npx @langchain/langgraph-cli@1.1.17 dev --host 0.0.0.0 --port ${PORT:-8123} --no-browser"]
