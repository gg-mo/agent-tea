export function jsonResponse(payload: unknown, status = 200) {
  return Response.json(payload, { status });
}

export async function safeParseJson<T>(request: Request): Promise<T> {
  try {
    return (await request.json()) as T;
  } catch {
    throw new Error('Invalid JSON body');
  }
}
