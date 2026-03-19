export class FetchError extends Error {
  constructor(
    message: string,
    public readonly status?: number
  ) {
    super(message);
    this.name = 'FetchError';
  }
}

export async function fetchWithTimeout(
  url: string,
  options: RequestInit & { timeout?: number } = {}
): Promise<Response> {
  const { timeout = 10_000, ...fetchOptions } = options;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new FetchError(`HTTP ${response.status}: ${response.statusText}`, response.status);
    }

    return response;
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new FetchError('Request timed out');
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}
