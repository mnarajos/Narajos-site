import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {servePublic} from './browser-test-site.mjs';

const {server,base}=await servePublic();
try {
 const oldPath='/alevel/co-transport-homework/';
 const newPath='/alevel/independent-practice/co-transport/';
 for(const path of [oldPath,oldPath.slice(0,-1)]){
  const response=await fetch(base+path,{redirect:'manual'});
  assert.equal(response.status,301,`${path} must redirect permanently`);
  assert.equal(response.headers.get('location'),newPath,'redirect should point directly to the canonical route');
 }
 const direct=await fetch(base+newPath,{redirect:'manual'});
 assert.equal(direct.status,200,'canonical route must open without redirecting');
 const html=await direct.text();
 assert.ok(html.includes(`<link rel="canonical" href="https://narajos.com${newPath}"`),'canonical metadata must use the new route');
 assert.ok(html.includes(`<meta property="og:url" content="https://narajos.com${newPath}"`),'social metadata must use the new route');
 const navigation=await readFile('public/alevel/index.html','utf8');
 assert.ok(navigation.includes(`href="${newPath}"`),'A-level navigation should link to the new route');
 assert.ok(!navigation.includes(`href="${oldPath}"`),'A-level navigation should not link to the old route');
 const followed=await fetch(base+oldPath);
 assert.equal(new URL(followed.url).pathname,newPath,'redirect must resolve to the new route');
 assert.equal(followed.status,200);
 console.log('Co-transport direct and permanent redirect routes passed.');
} finally {await new Promise(resolve=>server.close(resolve));}
