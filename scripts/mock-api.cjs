const http = require("node:http");

const port = Number(process.env.MOCK_API_PORT || 3199);
const requests = [];
const requiredFields = {
  "/place-truck": ["fullname", "email", "location", "availableFrom"],
  "/partner-join": ["fullname", "email", "phoneNumber"],
};

const server = http.createServer((request, response) => {
  response.setHeader("Access-Control-Allow-Origin", request.headers.origin || "*");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type");
  response.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");

  if (request.method === "OPTIONS") {
    response.writeHead(204).end();
    return;
  }

  if (request.method === "GET" && request.url === "/__requests") {
    response.setHeader("Content-Type", "application/json");
    response.end(JSON.stringify(requests));
    return;
  }

  const expected = requiredFields[request.url];
  if (request.method !== "POST" || !expected) {
    response.writeHead(404).end("Not found");
    return;
  }

  let body = "";
  request.on("data", (chunk) => {
    body += chunk;
  });
  request.on("end", () => {
    try {
      const payload = JSON.parse(body);
      const missing = expected.filter((field) => !payload[field]);
      requests.push({ method: request.method, path: request.url, payload });
      response.setHeader("Content-Type", "application/json");
      if (missing.length) {
        response.writeHead(400).end(JSON.stringify({ error: `Missing ${missing.join(", ")}` }));
        return;
      }
      response.writeHead(200).end(JSON.stringify({ message: "Synthetic enquiry accepted" }));
    } catch {
      response.writeHead(400).end(JSON.stringify({ error: "Invalid JSON" }));
    }
  });
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Synthetic contract API listening on http://127.0.0.1:${port}`);
});
