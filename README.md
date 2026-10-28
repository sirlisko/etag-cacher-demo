# EtagCacher Demo

A demonstration of bounded, ETag-driven polling with RTK Query.

**Live demo:** https://sirlisko.github.io/etag-cacher-demo/

## Overview

Some backends acknowledge a write before they have finished processing it. Instead of polling on a fixed interval forever, the EtagCacher polls only after a mutation and stops as soon as the server reports a change.

### Key Features

- **ETag-based change detection**: Compares the ETag of each response with the last one seen
- **Pending-state detection**: Optionally keeps polling while any item is still in a pending state
- **Bounded polling**: Only polls after a mutation, and stops on change or after a retry limit
- **RTK Query integration**: Refetches by invalidating a cache tag

Note that this is not HTTP conditional caching: each poll downloads the full response, and the ETag is compared on the client.

## How it Works

1. When you add or update a todo item, polling starts
2. Each refetch compares the response ETag with the cached one, and checks whether any todo is still `processing`
3. Polling stops once the ETag has changed and nothing is processing, or after 5 retries
4. New todos are created as `processing`; the mock server finishes them after 2 seconds, changing the data and the ETag together. Toggling a todo is synchronous, so polling stops on the first refetch

## Project Structure

- `src/api/eTagCacher.ts` - The core EtagCacher implementation
- `src/api/todosApi.ts` - RTK Query API setup with EtagCacher integration
- `src/mocks/server.ts` - Mock server implementation with ETag support
- `src/App.tsx` - React components for the Todo app UI

## Getting Started

```bash
# Install dependencies
pnpm install

# Start the development server
pnpm run dev
```

## How to Use

1. Add new todos using the form
2. Mark todos as completed using the checkboxes
3. Watch the polling indicator in the top right to see when polling is active
4. Notice how polling stops once the new todo leaves the `processing` state

## Testing

The project includes a comprehensive test suite for the EtagCacher utility using Vitest.

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm run test:watch
```

## Technologies Used

- React + TypeScript
- Redux Toolkit Query
- MSW (Mock Service Worker)
- Vite
- Vitest (for testing)
