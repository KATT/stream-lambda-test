// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

const waitMs = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.writeHead(200, {
    Connection: "keep-alive",
    "Content-Encoding": "none",
    "Cache-Control": "no-cache, no-transform",
    "Content-Type": "text/event-stream",
  });

  console.log(
    "flush exists?",
    // @ts-expect-error this exists locally at least
    !!res?.flush
  );
  for (let i = 0; i < 1_000; i++) {
    // res.chunkedEncoding = true;>
    res.write(`data: ${i}\n\n`);

    // @ts-expect-error this exists locally at least
    res?.flush();

    await waitMs(3);
  }
  res.end();
}
