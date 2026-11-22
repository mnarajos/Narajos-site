import {createServer} from "node:http";
import {readFile,stat} from "node:fs/promises";
import {resolve,extname,sep} from "node:path";

export async function servePublic() {
 const root=resolve("public");
 const types={".html":"text/html; charset=utf-8",".js":"text/javascript; charset=utf-8",".css":"text/css; charset=utf-8",".svg":"image/svg+xml",".json":"application/json",".png":"image/png",".jpg":"image/jpeg",".webp":"image/webp",".woff2":"font/woff2"};
 const server=createServer(async(req,res)=>{
  try{
   const url=new URL(req.url,"http://localhost");
   let path=resolve(root,"."+decodeURIComponent(url.pathname));
   if(path!==root&&!path.startsWith(root+sep)){res.writeHead(403);res.end();return;}
   const meta=await stat(path).catch(()=>null);
   if(meta?.isDirectory()||url.pathname.endsWith("/"))path=resolve(path,"index.html");
   const content=await readFile(path);
   res.writeHead(200,{"Content-Type":types[extname(path)]||"application/octet-stream","Cache-Control":"no-store"});
   res.end(content);
  }catch(_){res.writeHead(404);res.end("Not found");}
 });
 await new Promise(done=>server.listen(0,"127.0.0.1",done));
 return {server,base:"http://127.0.0.1:"+server.address().port};
}
