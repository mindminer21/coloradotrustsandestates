import { NextRequest, NextResponse } from "next/server";

const COOKIE_NAME = "wmw_review";

function secureEqual(left: string, right: string) {
  if (left.length !== right.length) return false;
  let mismatch = 0;
  for (let index = 0; index < left.length; index += 1) {
    mismatch |= left.charCodeAt(index) ^ right.charCodeAt(index);
  }
  return mismatch === 0;
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[character];
  });
}

function gatePage(returnTo: string, error = "", unavailable = false) {
  const safeReturnTo = escapeHtml(returnTo);
  const message = unavailable
    ? "Review access is not configured. Please contact Jeff Schell."
    : "Enter the password provided with the Month 2 Update.";
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="robots" content="noindex,nofollow,noarchive" />
  <title>Whiteford Mountain West | Leadership Review</title>
  <style>
    :root{--navy:#003756;--deep:#02243a;--paper:#f7f5f1;--gold:#c6a15b;--sky:#8fb8d4}
    *{box-sizing:border-box}body{margin:0;min-height:100vh;display:grid;place-items:center;background:linear-gradient(150deg,var(--deep),var(--navy));color:var(--paper);font-family:Arial,sans-serif;padding:28px}
    main{width:min(520px,100%);border:1px solid rgba(255,255,255,.24);background:rgba(2,36,58,.78);padding:42px;box-shadow:0 28px 80px rgba(0,0,0,.28)}
    .lockup{display:flex;align-items:center;gap:16px;margin-bottom:54px}.mark{display:block;width:162px;height:auto;flex:0 0 auto}.divider{width:1px;height:30px;background:rgba(255,255,255,.35)}.region{font-family:Georgia,serif;font-size:20px;font-weight:700}
    .eyebrow{color:#d9bc85;font-size:12px;font-weight:700;letter-spacing:.16em;text-transform:uppercase}h1{font-family:Georgia,serif;font-size:42px;line-height:1.05;margin:14px 0 16px}p{color:rgba(255,255,255,.72);line-height:1.55;margin:0 0 28px}
    label{display:block;font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;margin-bottom:9px}input{width:100%;height:48px;border:1px solid rgba(255,255,255,.28);background:#fff;color:#021b2c;padding:0 14px;font-size:16px}
    button{width:100%;height:48px;border:0;background:var(--gold);color:var(--deep);font-weight:800;font-size:15px;margin-top:14px;cursor:pointer}.error{color:#ffd5cb;font-weight:700;margin:0 0 18px}.ridge{display:flex;align-items:end;height:70px;margin:38px -42px -42px;overflow:hidden}.ridge span{display:block;width:25%;height:70px;background:#155578;clip-path:polygon(50% 0,100% 100%,0 100%)}.ridge span:nth-child(even){height:54px;background:#02243a}
    footer{margin-top:24px;color:rgba(255,255,255,.45);font-size:10px}
  </style>
</head>
<body>
  <main>
    <div class="lockup"><img class="mark" src="/brand/whiteford_header_logo.svg" alt="Whiteford logo" /><div class="divider"></div><div class="region">Mountain West</div></div>
    <div class="eyebrow">Confidential leadership review</div>
    <h1>Private preview</h1>
    <p>${message}</p>
    ${error ? `<div class="error">${escapeHtml(error)}</div>` : ""}
    ${unavailable ? "" : `<form method="post"><input type="hidden" name="returnTo" value="${safeReturnTo}" /><label for="password">Review password</label><input id="password" name="password" type="password" autocomplete="current-password" required autofocus /><button type="submit">View site</button></form>`}
    <footer>CONFIDENTIAL, Prepared by Jeff Schell, (720) 667-7721, jschell@whitefordlaw.com</footer>
    <div class="ridge"><span></span><span></span><span></span><span></span></div>
  </main>
</body>
</html>`;
}

function gateResponse(returnTo: string, error = "", unavailable = false, status = 401) {
  return new NextResponse(gatePage(returnTo, error, unavailable), {
    status,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "private, no-store, max-age=0",
      "x-robots-tag": "noindex, nofollow, noarchive",
    },
  });
}

export default async function middleware(request: NextRequest) {
  const reviewPassword = process.env.REVIEW_PASSWORD;
  const reviewToken = process.env.REVIEW_AUTH_TOKEN;
  const returnTo = `${request.nextUrl.pathname}${request.nextUrl.search}`;

  if (!reviewPassword || !reviewToken) {
    return gateResponse(returnTo, "", true, 503);
  }

  const cookie = request.cookies.get(COOKIE_NAME)?.value;
  if (cookie && secureEqual(cookie, reviewToken)) {
    return NextResponse.next();
  }

  if (request.method === "POST") {
    const form = await request.formData();
    const suppliedPassword = String(form.get("password") ?? "");
    const requestedReturnTo = String(form.get("returnTo") ?? "/");
    const safeReturnTo = requestedReturnTo.startsWith("/") && !requestedReturnTo.startsWith("//")
      ? requestedReturnTo
      : "/";

    if (secureEqual(suppliedPassword, reviewPassword)) {
      const response = NextResponse.redirect(new URL(safeReturnTo, request.url), 303);
      response.cookies.set(COOKIE_NAME, reviewToken, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });
      return response;
    }

    return gateResponse(safeReturnTo, "That password was not recognized.", false, 401);
  }

  return gateResponse(returnTo);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|brand/|favicon.ico).*)"],
};
