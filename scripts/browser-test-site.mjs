import {createServer} from "node:http";
import {readFile,stat} from "node:fs/promises";
import {gzipSync} from "node:zlib";
import {resolve,extname,sep} from "node:path";

export async function servePublic({directory="public", compress=false}={}) {
 const root=resolve(directory);
 const types={".html":"text/html; charset=utf-8",".js":"text/javascript; charset=utf-8",".css":"text/css; charset=utf-8",".svg":"image/svg+xml",".json":"application/json",".png":"image/png",".jpg":"image/jpeg",".webp":"image/webp",".woff2":"font/woff2"};
 // Model exact-path redirects declared for Cloudflare's static asset host.
 // Keep this intentionally narrow: do not silently approximate wildcard rules.
 const redirectText=await readFile(resolve(root,"_redirects"),"utf8").catch(()=>"");
 const redirects=redirectText.split(/\r?\n/).map(line=>line.trim()).filter(line=>line&&!line.startsWith("#")).map(line=>line.split(/\s+/)).filter(([from,to,status])=>from&&to&&/^(301|302|303|307|308)$/.test(status)&&!from.includes("*"));
 const server=createServer(async(req,res)=>{
  try{
   const url=new URL(req.url,"http://localhost");
   const redirect=redirects.find(([from])=>from===url.pathname);
   if(redirect){res.writeHead(Number(redirect[2]),{Location:redirect[1],"Cache-Control":"no-store"});res.end();return;}
   let path=resolve(root,"."+decodeURIComponent(url.pathname));
   if(path!==root&&!path.startsWith(root+sep)){res.writeHead(403);res.end();return;}
   const meta=await stat(path).catch(()=>null);
   if(meta?.isDirectory()||url.pathname.endsWith("/"))path=resolve(path,"index.html");
   const content=await readFile(path);
   const extension=extname(path);
   const headers={"Content-Type":types[extension]||"application/octet-stream","Cache-Control":"no-store"};
   if(compress && [".html",".css",".js",".svg",".json"].includes(extension) && req.headers["accept-encoding"]?.includes("gzip")){
    headers["Content-Encoding"]="gzip";
    res.writeHead(200,headers);
    res.end(gzipSync(content));
   } else {
    res.writeHead(200,headers);
    res.end(content);
   }
  }catch(_){res.writeHead(404);res.end("Not found");}
 });
 await new Promise(done=>server.listen(0,"127.0.0.1",done));
 return {server,base:"http://127.0.0.1:"+server.address().port};
}
